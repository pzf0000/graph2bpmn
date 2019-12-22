var mxClient =
    {
        VERSION: '4.0.6',
        IS_IE: navigator.userAgent.indexOf('MSIE') >= 0,
        IS_IE6: navigator.userAgent.indexOf('MSIE 6') >= 0,
        IS_IE11: !!navigator.userAgent.match(/Trident\/7\./),
        IS_EDGE: !!navigator.userAgent.match(/Edge\//),
        IS_QUIRKS: navigator.userAgent.indexOf('MSIE') >= 0 && (document.documentMode == null || document.documentMode == 5),
        IS_EM: 'spellcheck' in document.createElement('textarea') && document.documentMode == 8,
        VML_PREFIX: 'v',
        OFFICE_PREFIX: 'o',
        IS_NS: navigator.userAgent.indexOf('Mozilla/') >= 0 &&
            navigator.userAgent.indexOf('MSIE') < 0 &&
            navigator.userAgent.indexOf('Edge/') < 0,
        IS_OP: navigator.userAgent.indexOf('Opera/') >= 0 ||
            navigator.userAgent.indexOf('OPR/') >= 0,
        IS_OT: navigator.userAgent.indexOf('Presto/') >= 0 &&
            navigator.userAgent.indexOf('Presto/2.4.') < 0 &&
            navigator.userAgent.indexOf('Presto/2.3.') < 0 &&
            navigator.userAgent.indexOf('Presto/2.2.') < 0 &&
            navigator.userAgent.indexOf('Presto/2.1.') < 0 &&
            navigator.userAgent.indexOf('Presto/2.0.') < 0 &&
            navigator.userAgent.indexOf('Presto/1.') < 0,
        IS_SF: navigator.userAgent.indexOf('AppleWebKit/') >= 0 &&
            navigator.userAgent.indexOf('Chrome/') < 0 &&
            navigator.userAgent.indexOf('Edge/') < 0,
        IS_IOS: (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false),
        IS_GC: navigator.userAgent.indexOf('Chrome/') >= 0 &&
            navigator.userAgent.indexOf('Edge/') < 0,
        IS_CHROMEAPP: window.chrome != null && chrome.app != null && chrome.app.runtime != null,
        IS_FF: navigator.userAgent.indexOf('Firefox/') >= 0,
        IS_MT: (navigator.userAgent.indexOf('Firefox/') >= 0 &&
            navigator.userAgent.indexOf('Firefox/1.') < 0 &&
            navigator.userAgent.indexOf('Firefox/2.') < 0) ||
            (navigator.userAgent.indexOf('Iceweasel/') >= 0 &&
                navigator.userAgent.indexOf('Iceweasel/1.') < 0 &&
                navigator.userAgent.indexOf('Iceweasel/2.') < 0) ||
            (navigator.userAgent.indexOf('SeaMonkey/') >= 0 &&
                navigator.userAgent.indexOf('SeaMonkey/1.') < 0) ||
            (navigator.userAgent.indexOf('Iceape/') >= 0 &&
                navigator.userAgent.indexOf('Iceape/1.') < 0),
        IS_VML: navigator.appName.toUpperCase() == 'MICROSOFT INTERNET EXPLORER',
        IS_SVG: navigator.appName.toUpperCase() != 'MICROSOFT INTERNET EXPLORER',
        NO_FO: !document.createElementNS || document.createElementNS('http://www.w3.org/2000/svg',
            'foreignObject') != '[object SVGForeignObjectElement]' || navigator.userAgent.indexOf('Opera/') >= 0,
        IS_WIN: navigator.appVersion.indexOf('Win') > 0,
        IS_MAC: navigator.appVersion.indexOf('Mac') > 0,
        IS_CHROMEOS: /\bCrOS\b/.test(navigator.userAgent),
        IS_TOUCH: 'ontouchstart' in document.documentElement,
        IS_POINTER: window.PointerEvent != null && !(navigator.appVersion.indexOf('Mac') > 0),
        IS_LOCAL: document.location.href.indexOf('http://') < 0 &&
            document.location.href.indexOf('https://') < 0,
        defaultBundles: [],
        isBrowserSupported: function () {
            return mxClient.IS_VML || mxClient.IS_SVG;
        },
        link: function (rel, href, doc, id) {
            doc = doc || document;
            if (mxClient.IS_IE6) {
                doc.write('<link rel="' + rel + '" href="' + href + '" charset="UTF-8" type="text/css"/>');
            } else {
                var link = doc.createElement('link');

                link.setAttribute('rel', rel);
                link.setAttribute('href', href);
                link.setAttribute('charset', 'UTF-8');
                link.setAttribute('type', 'text/css');

                if (id) {
                    link.setAttribute('id', id);
                }

                var head = doc.getElementsByTagName('head')[0];
                head.appendChild(link);
            }
        },
        loadResources: function (fn, lan) {
            var pending = mxClient.defaultBundles.length;
            function callback() {
                if (--pending == 0) {
                    fn();
                }
            }
            for (var i = 0; i < mxClient.defaultBundles.length; i++) {
                mxResources.add(mxClient.defaultBundles[i], lan, callback);
            }
        },
        include: function (src) {
            document.write('<script src="' + src + '"></script>');
        }
    };
if (typeof (mxLoadResources) == 'undefined') {
    mxLoadResources = true;
}
if (typeof (mxForceIncludes) == 'undefined') {
    mxForceIncludes = false;
}
if (typeof (mxResourceExtension) == 'undefined') {
    mxResourceExtension = '.txt';
}
if (typeof (mxLoadStylesheets) == 'undefined') {
    mxLoadStylesheets = true;
}
if (typeof (mxBasePath) != 'undefined' && mxBasePath.length > 0) {
    // Adds a trailing slash if required
    if (mxBasePath.substring(mxBasePath.length - 1) == '/') {
        mxBasePath = mxBasePath.substring(0, mxBasePath.length - 1);
    }

    mxClient.basePath = mxBasePath;
} else {
    mxClient.basePath = '.';
}
if (typeof (mxImageBasePath) != 'undefined' && mxImageBasePath.length > 0) {
    // Adds a trailing slash if required
    if (mxImageBasePath.substring(mxImageBasePath.length - 1) == '/') {
        mxImageBasePath = mxImageBasePath.substring(0, mxImageBasePath.length - 1);
    }

    mxClient.imageBasePath = mxImageBasePath;
} else {
    mxClient.imageBasePath = mxClient.basePath + '/images';
}
if (typeof (mxLanguage) != 'undefined' && mxLanguage != null) {
    mxClient.language = mxLanguage;
} else {
    mxClient.language = (mxClient.IS_IE) ? navigator.userLanguage : navigator.language;
}
if (typeof (mxDefaultLanguage) != 'undefined' && mxDefaultLanguage != null) {
    mxClient.defaultLanguage = mxDefaultLanguage;
} else {
    mxClient.defaultLanguage = 'en';
}
if (mxLoadStylesheets) {
    mxClient.link('stylesheet', mxClient.basePath + '/css/common.css');
}
if (typeof (mxLanguages) != 'undefined' && mxLanguages != null) {
    mxClient.languages = mxLanguages;
}

if (mxClient.IS_VML) {
    if (mxClient.IS_SVG) {
        mxClient.IS_VML = false;
    } else {
        if (document.documentMode == 8) {
            document.namespaces.add(mxClient.VML_PREFIX, 'urn:schemas-microsoft-com:vml', '#default#VML');
            document.namespaces.add(mxClient.OFFICE_PREFIX, 'urn:schemas-microsoft-com:office:office', '#default#VML');
        } else {
            document.namespaces.add(mxClient.VML_PREFIX, 'urn:schemas-microsoft-com:vml');
            document.namespaces.add(mxClient.OFFICE_PREFIX, 'urn:schemas-microsoft-com:office:office');
        }
        if (mxClient.IS_QUIRKS && document.styleSheets.length >= 30) {
            (function () {
                var node = document.createElement('style');
                node.type = 'text/css';
                node.styleSheet.cssText = mxClient.VML_PREFIX + '\\:*{behavior:url(#default#VML)}' +
                    mxClient.OFFICE_PREFIX + '\\:*{behavior:url(#default#VML)}';
                document.getElementsByTagName('head')[0].appendChild(node);
            })();
        } else {
            document.createStyleSheet().cssText = mxClient.VML_PREFIX + '\\:*{behavior:url(#default#VML)}' +
                mxClient.OFFICE_PREFIX + '\\:*{behavior:url(#default#VML)}';
        }

        if (mxLoadStylesheets) {
            mxClient.link('stylesheet', mxClient.basePath + '/css/explorer.css');
        }
    }
}
if (mxForceIncludes || !(typeof module === 'object' && module.exports != null)) {
    mxClient.include(mxClient.basePath + '/util/mxLog.js');
    mxClient.include(mxClient.basePath + '/util/mxObjectIdentity.js');
    mxClient.include(mxClient.basePath + '/util/mxDictionary.js');
    mxClient.include(mxClient.basePath + '/util/mxResources.js');
    mxClient.include(mxClient.basePath + '/util/mxPoint.js');
    mxClient.include(mxClient.basePath + '/util/mxRectangle.js');
    mxClient.include(mxClient.basePath + '/util/mxEffects.js');
    mxClient.include(mxClient.basePath + '/util/mxUtils.js');
    mxClient.include(mxClient.basePath + '/util/mxConstants.js');
    mxClient.include(mxClient.basePath + '/util/mxEventObject.js');
    mxClient.include(mxClient.basePath + '/util/mxMouseEvent.js');
    mxClient.include(mxClient.basePath + '/util/mxEventSource.js');
    mxClient.include(mxClient.basePath + '/util/mxEvent.js');
    mxClient.include(mxClient.basePath + '/util/mxXmlRequest.js');
    mxClient.include(mxClient.basePath + '/util/mxClipboard.js');
    mxClient.include(mxClient.basePath + '/util/mxWindow.js');
    mxClient.include(mxClient.basePath + '/util/mxForm.js');
    mxClient.include(mxClient.basePath + '/util/mxImage.js');
    mxClient.include(mxClient.basePath + '/util/mxDivResizer.js');
    mxClient.include(mxClient.basePath + '/util/mxDragSource.js');
    mxClient.include(mxClient.basePath + '/util/mxToolbar.js');
    mxClient.include(mxClient.basePath + '/util/mxUndoableEdit.js');
    mxClient.include(mxClient.basePath + '/util/mxUndoManager.js');
    mxClient.include(mxClient.basePath + '/util/mxUrlConverter.js');
    mxClient.include(mxClient.basePath + '/util/mxPanningManager.js');
    mxClient.include(mxClient.basePath + '/util/mxPopupMenu.js');
    mxClient.include(mxClient.basePath + '/util/mxAutoSaveManager.js');
    mxClient.include(mxClient.basePath + '/util/mxAnimation.js');
    mxClient.include(mxClient.basePath + '/util/mxMorphing.js');
    mxClient.include(mxClient.basePath + '/util/mxImageBundle.js');
    mxClient.include(mxClient.basePath + '/util/mxImageExport.js');
    mxClient.include(mxClient.basePath + '/util/mxAbstractCanvas2D.js');
    mxClient.include(mxClient.basePath + '/util/mxXmlCanvas2D.js');
    mxClient.include(mxClient.basePath + '/util/mxSvgCanvas2D.js');
    mxClient.include(mxClient.basePath + '/util/mxVmlCanvas2D.js');
    mxClient.include(mxClient.basePath + '/util/mxGuide.js');
    mxClient.include(mxClient.basePath + '/shape/mxShape.js');
    mxClient.include(mxClient.basePath + '/shape/mxStencil.js');
    mxClient.include(mxClient.basePath + '/shape/mxStencilRegistry.js');
    mxClient.include(mxClient.basePath + '/shape/mxMarker.js');
    mxClient.include(mxClient.basePath + '/shape/mxActor.js');
    mxClient.include(mxClient.basePath + '/shape/mxCloud.js');
    mxClient.include(mxClient.basePath + '/shape/mxRectangleShape.js');
    mxClient.include(mxClient.basePath + '/shape/mxEllipse.js');
    mxClient.include(mxClient.basePath + '/shape/mxDoubleEllipse.js');
    mxClient.include(mxClient.basePath + '/shape/mxRhombus.js');
    mxClient.include(mxClient.basePath + '/shape/mxPolyline.js');
    mxClient.include(mxClient.basePath + '/shape/mxArrow.js');
    mxClient.include(mxClient.basePath + '/shape/mxArrowConnector.js');
    mxClient.include(mxClient.basePath + '/shape/mxText.js');
    mxClient.include(mxClient.basePath + '/shape/mxTriangle.js');
    mxClient.include(mxClient.basePath + '/shape/mxHexagon.js');
    mxClient.include(mxClient.basePath + '/shape/mxLine.js');
    mxClient.include(mxClient.basePath + '/shape/mxImageShape.js');
    mxClient.include(mxClient.basePath + '/shape/mxLabel.js');
    mxClient.include(mxClient.basePath + '/shape/mxCylinder.js');
    mxClient.include(mxClient.basePath + '/shape/mxConnector.js');
    mxClient.include(mxClient.basePath + '/shape/mxSwimlane.js');
    mxClient.include(mxClient.basePath + '/layout/mxGraphLayout.js');
    mxClient.include(mxClient.basePath + '/layout/mxStackLayout.js');
    mxClient.include(mxClient.basePath + '/layout/mxPartitionLayout.js');
    mxClient.include(mxClient.basePath + '/layout/mxCompactTreeLayout.js');
    mxClient.include(mxClient.basePath + '/layout/mxRadialTreeLayout.js');
    mxClient.include(mxClient.basePath + '/layout/mxFastOrganicLayout.js');
    mxClient.include(mxClient.basePath + '/layout/mxCircleLayout.js');
    mxClient.include(mxClient.basePath + '/layout/mxParallelEdgeLayout.js');
    mxClient.include(mxClient.basePath + '/layout/mxCompositeLayout.js');
    mxClient.include(mxClient.basePath + '/layout/mxEdgeLabelLayout.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/model/mxGraphAbstractHierarchyCell.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/model/mxGraphHierarchyNode.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/model/mxGraphHierarchyEdge.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/model/mxGraphHierarchyModel.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/model/mxSwimlaneModel.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/stage/mxHierarchicalLayoutStage.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/stage/mxMedianHybridCrossingReduction.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/stage/mxMinimumCycleRemover.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/stage/mxCoordinateAssignment.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/stage/mxSwimlaneOrdering.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/mxHierarchicalLayout.js');
    mxClient.include(mxClient.basePath + '/layout/hierarchical/mxSwimlaneLayout.js');
    mxClient.include(mxClient.basePath + '/model/mxGraphModel.js');
    mxClient.include(mxClient.basePath + '/model/mxCell.js');
    mxClient.include(mxClient.basePath + '/model/mxGeometry.js');
    mxClient.include(mxClient.basePath + '/model/mxCellPath.js');
    mxClient.include(mxClient.basePath + '/view/mxPerimeter.js');
    mxClient.include(mxClient.basePath + '/view/mxPrintPreview.js');
    mxClient.include(mxClient.basePath + '/view/mxStylesheet.js');
    mxClient.include(mxClient.basePath + '/view/mxCellState.js');
    mxClient.include(mxClient.basePath + '/view/mxGraphSelectionModel.js');
    mxClient.include(mxClient.basePath + '/view/mxCellEditor.js');
    mxClient.include(mxClient.basePath + '/view/mxCellRenderer.js');
    mxClient.include(mxClient.basePath + '/view/mxEdgeStyle.js');
    mxClient.include(mxClient.basePath + '/view/mxStyleRegistry.js');
    mxClient.include(mxClient.basePath + '/view/mxGraphView.js');
    mxClient.include(mxClient.basePath + '/view/mxGraph.js');
    mxClient.include(mxClient.basePath + '/view/mxCellOverlay.js');
    mxClient.include(mxClient.basePath + '/view/mxOutline.js');
    mxClient.include(mxClient.basePath + '/view/mxMultiplicity.js');
    mxClient.include(mxClient.basePath + '/view/mxLayoutManager.js');
    mxClient.include(mxClient.basePath + '/view/mxSwimlaneManager.js');
    mxClient.include(mxClient.basePath + '/view/mxTemporaryCellStates.js');
    mxClient.include(mxClient.basePath + '/view/mxCellStatePreview.js');
    mxClient.include(mxClient.basePath + '/view/mxConnectionConstraint.js');
    mxClient.include(mxClient.basePath + '/handler/mxGraphHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxPanningHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxPopupMenuHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxCellMarker.js');
    mxClient.include(mxClient.basePath + '/handler/mxSelectionCellsHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxConnectionHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxConstraintHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxRubberband.js');
    mxClient.include(mxClient.basePath + '/handler/mxHandle.js');
    mxClient.include(mxClient.basePath + '/handler/mxVertexHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxEdgeHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxElbowEdgeHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxEdgeSegmentHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxKeyHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxTooltipHandler.js');
    mxClient.include(mxClient.basePath + '/handler/mxCellTracker.js');
    mxClient.include(mxClient.basePath + '/handler/mxCellHighlight.js');
    mxClient.include(mxClient.basePath + '/editor/mxDefaultKeyHandler.js');
    mxClient.include(mxClient.basePath + '/editor/mxDefaultPopupMenu.js');
    mxClient.include(mxClient.basePath + '/editor/mxDefaultToolbar.js');
    mxClient.include(mxClient.basePath + '/editor/mxEditor.js');
    mxClient.include(mxClient.basePath + '/io/mxCodecRegistry.js');
    mxClient.include(mxClient.basePath + '/io/mxCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxObjectCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxCellCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxModelCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxRootChangeCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxChildChangeCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxTerminalChangeCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxGenericChangeCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxGraphCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxGraphViewCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxStylesheetCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxDefaultKeyHandlerCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxDefaultToolbarCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxDefaultPopupMenuCodec.js');
    mxClient.include(mxClient.basePath + '/io/mxEditorCodec.js');
}
