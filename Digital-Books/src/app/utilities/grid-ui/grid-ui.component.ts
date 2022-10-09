import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-ui',
  templateUrl: './grid-ui.component.html',
  styleUrls: ['./grid-ui.component.css']
})
export class GridUiComponent implements OnInit {

  constructor() { }

  gridColumns:Array<any>= new Array<any>();
  gridData:Array<any>= new Array<any>();

  ngOnInit(): void {
  }
  @Input("grid-columns")
  set SetGridColumns(_gridColumn:Array<any>){
    this.gridColumns=_gridColumn;
  }
  @Input("grid-data")
  set SetGridData(_gridData:Array<any>){
    this.gridData=_gridData;
  }

  @Output("grid-selected")
  emitemitter:EventEmitter<any> = new  EventEmitter<any>();

  selectedGrid(_selected:any)
  {
    debugger;
    this.emitemitter.emit(_selected);
  }
  @Output("grid-deleted")
  emitemitterd:EventEmitter<any>=new EventEmitter<any>();

  deletedGrid(_dselected:any){
    debugger;
    this.emitemitterd.emit(_dselected);
  }

  blockGrid(_bselected:any){
    debugger;
    this.emitemitterb.emit(_bselected);
  }
 @Output("grid-block")
  emitemitterb:EventEmitter<any>=new EventEmitter<any>();

}
