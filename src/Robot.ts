import * as gfx from 'gophergfx'
import { RobotPart } from './RobotPart';

export class Robot extends gfx.Transform3
{
    public root: RobotPart;

    constructor()
    {
        super();

        this.root = new RobotPart('root');
        this.add(this.root);
    }

    createMeshes(): void
    {
        this.root.createMeshes();
    }

    setPose(name: string, pose: gfx.Quaternion): void
    {
        // TO BE ADDED
    }

    reset(): void
    {
        // TO BE ADDED
    }

    update(deltaTime: number): void
    {
        // TO BE ADDED
    }
}