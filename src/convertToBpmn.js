function initDefinitionsTag(id) {
    let definitions = {
        "_attr": {}
    };
    definitions["_attr"]["xmlns:xsi"] = "http://www.w3.org/2001/XMLSchema-instance";
    definitions["_attr"]["xmlns:bpmn"] = "http://www.omg.org/spec/BPMN/20100524/MODEL";
    definitions["_attr"]["xmlns:bpmndi"] = "http://www.omg.org/spec/BPMN/20100524/DI";
    definitions["_attr"]["xmlns:dc"] = "http://www.omg.org/spec/DD/20100524/DC";
    definitions["_attr"]["xmlns:di"] = "http://www.omg.org/spec/DD/20100524/DI";
    definitions["_attr"]["id"] = id;
    definitions["_attr"]["exporter"] = "Freely Flow Editor";
    // FIXME if collaboration existed

    definitions["bpmn:process"] = {
        "_attr": {
            "id": "Process",
            "isExecutable": "true"
        }
    };
    definitions["bpmndi:BPMNDiagram"] = {
        "_attr": {
            "id": "BPMNDiagram"
        },
        "bpmndi:BPMNPlane": {
            "_attr": {
                "id": "BPMNPlane",
                "bpmnElement": "Process"
            },
            "bpmndi:BPMNShape": [],
            "bpmndi:BPMNEdge": []
        }
    };
    return definitions;
}
function convertP(cell) {
    let pTag = {
        "_attr": {}
    };
    pTag["_attr"]["id"] = cell.id;
    if(cell.edge) {
        pTag["_attr"]["sourceRef"] = cell.source.id;
        pTag["_attr"]["targetRef"] = cell.target.id;
    } else {
        let edges = cell.edges;
        for (let edge of edges) {
            if(edge.source.id === cell.id) {
                pTag["bpmn:outgoing"] = edge.id;
            } else {
                pTag["bpmn:incoming"] = edge.id;
            }
        }
    }
    if(cell.value) {
        pTag["_attr"]["name"] = cell.value;
    }
    // TODO 属性 props
    return pTag;
}
function convertD(cell) {
    let dTag = {
        "_attr": {},
        "_value": ""
    };
    dTag["_attr"]["id"] = cell.id + "_di";
    dTag["_attr"]["bpmnElement"] = cell.id;
    if(cell.edge) {
        dTag["edge"] = "true";
        // TODO 起点
        // TODO 普通转折点
        if(cell.points && cell.points.length > 0) {
            dTag["di:waypoint"] = [];
            for(let point of points) {
                dTag["di:waypoint"].push({
                    "_attr": {
                        "x": point.x,
                        "y": point.y
                    }}
                )
            }
        }
        // TODO 终点
    } else {
        dTag["dc:Bounds"] = {
            "_attr": {
                "x": cell.geometry.x,
                "y": cell.geometry.y,
                "width": cell.geometry.width,
                "height": cell.geometry.height
            }
        }
    }
    let cellType = null;

    if(cell.style) {
        let styles = cell.style.split(";");
        if(styles[styles.length - 1] === "") {
            styles.pop();
        }
        cellType = styles[0].split("=")[1];
        delete styles[0];
        styles.length -= 1;
        if(styles.length > 0) {
            for(let style of styles) {
                let tmp = style.split("=");
                let name = tmp[0];
                let value = tmp[1];
                if(!dTag["_attr"][name]) {
                    dTag["_attr"][name] = value;
                } else {
                    console.error(cell.id + " style 与内置属性冲突！");
                }
            }
        }
    }
    if(!cellType) {
        cellType = "sequenceFlow";
    }
    dTag["cellType"] = cellType;
    return dTag;
}
function convertCell(cell) {
    if(!cell.geometry) {
        return null;
    }
    let pTag = convertP(cell);
    let dTag = convertD(cell);
    let cellType = dTag.cellType;
    delete dTag.cellType;
    // TODO Collaboration Tag
    return {
        tagName: cellType,
        pTag: pTag,
        dTag: dTag
    }
}

function convert(graph) {
    let cells = graph.model.cells;
    for(let name in cells) {
        cells[name] = convertCell(cells[name]);
    }
    let definitions = initDefinitionsTag(graph.props.id);

    for(let name in cells) {
        let cell = cells[name];
        if(cell) {
            if(definitions["bpmn:process"]["bpmn:" + cell.tagName] && definitions["bpmn:process"]["bpmn:" + cell.tagName].length) {
                definitions["bpmn:process"]["bpmn:" + cell.tagName].push(cell.pTag);
            } else if (definitions["bpmn:process"]["bpmn:" + cell.tagName]) {
                let tmp = definitions["bpmn:process"]["bpmn:" + cell.tagName];
                definitions["bpmn:process"]["bpmn:" + cell.tagName] = [tmp, cell.pTag];
            } else {
                definitions["bpmn:process"]["bpmn:" + cell.tagName] = cell.pTag;
            }
            if(cell.dTag.edge && cell.dTag.edge === "true") {
                delete cell.dTag.edge;
                definitions["bpmndi:BPMNDiagram"]["bpmndi:BPMNPlane"]["bpmndi:BPMNEdge"].push(cell.dTag);
            } else {
                definitions["bpmndi:BPMNDiagram"]["bpmndi:BPMNPlane"]["bpmndi:BPMNShape"].push(cell.dTag);
            }
        }
    }
    return definitions;
}