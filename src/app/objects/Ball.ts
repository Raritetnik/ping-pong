import { ElementRef } from '@angular/core';

export class Ball {
    private ballElement: any;
    private actualPosition: number[];
    private ballStep = [0,0];

    // Generate random direction of the ball
    private angle = Math.random()*Math.PI*2;
    private x = Math.cos(this.angle) * 10;
    private y = Math.sin(this.angle) * 10;

    private intervalAction: any;


    /**
     * BALL POSITION VECTOR [X, Y] -> [TO LEFT, TO TOP] -> Max[500, 250]
     */

    constructor(elementHTML: ElementRef) {
        this.ballElement = elementHTML;
        this.actualPosition = [Number(String(this.ballElement.nativeElement.style.left).replace('px', "")), Number(String(this.ballElement.nativeElement.style.top).replace('px', ""))];
        this.ballStep[0] = this.x;
        this.ballStep[1] = this.y;
    }

    public stepMovementAction(): void {
        //console.log('Made step ['+this.actualPosition[1]+','+this.actualPosition[0]+']');
        this.actualPosition[0] += this.ballStep[0];
        this.actualPosition[1] += this.ballStep[1];

        // Verification of direction
        if(this.actualPosition[0] >= 1000 || this.actualPosition[0] <= 0) {
            this.ballStep[0] *= -1;
            console.log('Change X direction');
        }
        if(this.actualPosition[1] >= 500 || this.actualPosition[1] <= 0) {
            this.ballStep[1] *= -1;
            console.log('Change Y direction');
        }
        this.adjustPosition();
    }

    public startGame(): void {
        clearInterval(this.intervalAction);
        this.intervalAction = setInterval(() => {
            this.stepMovementAction();
        }, 20);
    }

    private adjustPosition() : void {
        this.ballElement.nativeElement.style.top = (this.actualPosition[1])+'px';
        this.ballElement.nativeElement.style.left = (this.actualPosition[0])+'px';
    }

    public resetGame(): void {
        clearInterval(this.intervalAction);
        this.actualPosition = [500, 250];
        this.adjustPosition();
    }
}