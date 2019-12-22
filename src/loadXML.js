function loadXML(xmlString) {
    let xmlDoc = null;
    if (!window.DOMParser && window.ActiveXObject) {
        let xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
        for (let i = 0; i < xmlDomVersions.length; i++) {
            try {
                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                break;
            } catch (e) {
            }
        }
    } else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
        try {
            domParser = new DOMParser();
            xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
        } catch (e) {
        }
    } else {
        return null;
    }

    return xmlDoc;
}