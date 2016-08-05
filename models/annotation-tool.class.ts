import {AnnotationLine} from './annotation-elements/annotation-polylines/annotation-line.class';
import {AnnotationElement} from './annotation-element.class';
import {AnnotationHighlighter} from './annotation-elements/annotation-polylines/annotation-highlighter.class';
export class AnnotationTool {
  name:string;
  iconClass:string;
  _type:string;

  constructor(obj?:any) {
    this.name = obj && obj.name || 'Unknown Tool';
    this.iconClass = obj && obj.iconClass || '';
  }

  createInstance(properties?:any):AnnotationElement {
    if (!properties) {
      properties = {};
    }
    if (this.name === 'pencil') {
      return new AnnotationLine(properties);
    }

    if (this.name === 'highlighter') {
      return new AnnotationHighlighter(properties);
    }

    return null;
  }

}
