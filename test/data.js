let data = `
<mxGraphModel>
    <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="2" value="Task" style="shape=ext;rounded=1;html=1;whiteSpace=wrap;" vertex="1" parent="1">
            <mxGeometry x="270" y="180" width="120" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="5" target="2">
            <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="5" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;" vertex="1" parent="1">
            <mxGeometry x="50" y="180" width="80" height="80" as="geometry"/>
        </mxCell>
    </root>
</mxGraphModel>
`;

let bpmn = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0na31xm" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="6.1.1">
  <bpmn:process id="Process" isExecutable="false">
    <bpmn:startEvent id="startEvent_1">
      <bpmn:outgoing>SequenceFlow_3</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="task_2" name="123">
      <bpmn:incoming>SequenceFlow_3</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_5</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_3" sourceRef="startEvent_1" targetRef="task_2" />
    <bpmn:endEvent id="EndEvent_4">
      <bpmn:incoming>SequenceFlow_5</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_5" sourceRef="task_2" targetRef="EndEvent_4" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram">
    <bpmndi:BPMNPlane id="BPMNPlane" bpmnElement="Process">
      <bpmndi:BPMNShape id="BPMNShape_StartEvent_2" bpmnElement="startEvent_1">
        <dc:Bounds x="156" y="81" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_di" bpmnElement="task_2">
        <dc:Bounds x="250" y="59" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_3_di" bpmnElement="SequenceFlow_3">
        <di:waypoint x="192" y="99" />
        <di:waypoint x="250" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_4_di" bpmnElement="EndEvent_4">
        <dc:Bounds x="412" y="81" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_5_di" bpmnElement="SequenceFlow_5">
        <di:waypoint x="350" y="99" />
        <di:waypoint x="412" y="99" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;