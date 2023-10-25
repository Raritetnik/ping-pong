import { ElementRef } from '@angular/core';

export class Player {
    private playerObject: any;
    private controlBtns: string[];
    private actualPosition: number;
    private playerStep = 20;

    constructor(elementHTML: ElementRef, control: string[]) {
        this.playerObject = elementHTML;
        this.controlBtns = control;
        this.actualPosition = Number(String(this.playerObject.nativeElement.style.top).replace('px', ""));
    }

    public doPlayerAction(direction: string): void {
        switch(direction) {
            case this.controlBtns[0]:
                this.adjustPosition(this.playerStep);
                break;
            case this.controlBtns[1]:
                this.adjustPosition(-this.playerStep);
                break;
        }
    }

    private adjustPosition(addToPosition: number ) : void {
        this.actualPosition -= ((this.actualPosition-addToPosition) > 50 && (this.actualPosition-addToPosition) < 450) ? addToPosition : 0;
        this.playerObject.nativeElement.style.top = (this.actualPosition)+'px';
    }
}