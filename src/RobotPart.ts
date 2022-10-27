import * as gfx from 'gophergfx'

export class RobotPart extends gfx.Transform3
{
    public name: string;
    public boneLength: number;

    constructor(name: string)
    {
        super();

        this.name = name;

        // Recursively create the robot skeleton
        if(this.name == 'root')
        {
            this.boneLength = 0.05;

            const child = new RobotPart('upperArm');
            child.position.set(0, this.boneLength, 0);
            this.add(child);
        }
        else if(this.name == 'upperArm')
        {
            this.boneLength = 0.5;
        }
        else
        {
            this.boneLength = 0;
        }
    }

}