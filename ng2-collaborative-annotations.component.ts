import {Component, OnInit} from '@angular/core';
import {
  CORE_DIRECTIVES, FORM_DIRECTIVES
} from '@angular/common';
import {Logger} from 'angular2-logger/core';
import {AnnotationTool} from './models/annotation-tool.class';
import {AnnotationElement} from './models/annotation-element.class';
import {AnnotationPolyLine} from './models/annotation-elements/annotation-polyline.class';

@Component({
  selector: 'ng2-annotations',
  moduleId: module.id,
  templateUrl: 'ng2-collaborative-annotations.component.html',
  styleUrls: ['ng2-collaborative-annotations.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class CollaborativeAnnotationsComponent implements OnInit {
  private saving:boolean;
  private selectedTool:AnnotationTool;
  private tools:Array<AnnotationTool>;
  private mouseIsDown:boolean = false;
  private currentAnnotationElement:AnnotationElement = null;
  private allLines:AnnotationElement[] = [];

  constructor(private _logger:Logger) {
  }

  ngOnInit() {
    this.saving = false;
    this.createAnnotationTools();
  }


  selectTool(tool:AnnotationTool) {
    this._logger.debug(`[${this.constructor.name}] Selecting new tool`, tool);
    this.selectedTool = tool;
  }

  /**
   * Creating a new annotation element regarding to the selected tool
   */
  startAnnotation() {
    this.mouseIsDown = true;
    this.currentAnnotationElement = this.selectedTool.createInstance();
    this._logger.debug(`[${this.constructor.name}]  Start drawing line`);
  }

  /**
   * Stops the creation of the current annotation element.
   */
  stopAnnotation() {
    this._logger.debug(`[${this.constructor.name}] Stop drawing line`, this.currentAnnotationElement);
    if (this.currentAnnotationElement) {
      this.allLines.push(this.currentAnnotationElement);
    }
    this.mouseIsDown = false;
    this.currentAnnotationElement = null;
  }

  /**
   * Adds more coordinates to an AnnotationPolyLine element.
   * @param event
   */
  drawLine(event:any) {
    if (this.mouseIsDown && !!this.currentAnnotationElement && this.currentAnnotationElement instanceof AnnotationPolyLine) {
      let currentPolylineElement:AnnotationPolyLine = this.currentAnnotationElement as AnnotationPolyLine;
      currentPolylineElement.addCoordinate(event.offsetX, event.offsetY);
      this._logger.debug(`[${this.constructor.name}]  Updating line`, this.currentAnnotationElement);
    }
  }

  // ------------------- Private functions -------------------------------

  private createAnnotationTools() {
    this.tools = [];
    let handTool:AnnotationTool = new AnnotationTool({name: 'hand', iconClass: 'fa fa-hand-pointer-o'});
    let pencilTool:AnnotationTool = new AnnotationTool({name: 'pencil', iconClass: 'fa fa-pencil'});
    let highlighterTool:AnnotationTool = new AnnotationTool({name: 'highlighter', iconClass: 'fa fa-pencil-square-o'});
    let textTool:AnnotationTool = new AnnotationTool({name: 'text', iconClass: 'fa fa-font'});
    let eraserTool:AnnotationTool = new AnnotationTool({name: 'eraser', iconClass: 'fa fa-eraser'});
    let circleTool:AnnotationTool = new AnnotationTool({name: 'circle', iconClass: 'fa fa-circle-o'});
    this.selectTool(handTool);
    this.tools.push(handTool);
    this.tools.push(pencilTool);
    this.tools.push(highlighterTool);
    this.tools.push(textTool);
    this.tools.push(eraserTool);
    this.tools.push(circleTool);
  }
}
