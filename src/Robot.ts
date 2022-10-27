import * as gfx from 'gophergfx'
import { RobotPart } from './RobotPart';

export class Robot extends gfx.Transform3
{
    public root: RobotPart;
    public resetAlpha: number;

    constructor()
    {
        super();
        this.resetAlpha = 1;
        this.root = new RobotPart('root');
        this.add(this.root);  
    }

    createMeshes(): void
    {
        this.root.createMeshes();
    }

    setPose(name: string, pose: gfx.Quaternion): void
    {
        this.root.setPose(name, pose);
    }

    reset(): void
    {
        this.resetAlpha = 0;
        this.root.reset();
    }

    update(deltaTime: number): void
    {
        const animationSpeed = 1;

        if(this.resetAlpha < 1)
        {
            this.resetAlpha += animationSpeed * deltaTime;
            this.resetAlpha = gfx.MathUtils.clamp(this.resetAlpha, 0, 1);
            this.root.interpolatePose(this.resetAlpha);
        }
    }
}