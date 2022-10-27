import * as gfx from 'gophergfx'

export class RobotPart extends gfx.Transform3
{
    public name: string;

    constructor(name: string)
    {
        super();

        this.name = name;
    }

}