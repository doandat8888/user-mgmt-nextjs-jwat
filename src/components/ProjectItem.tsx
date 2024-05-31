import React from 'react'
import { Button } from './ui/button'

interface Props {
    projectName: string;
    removeProject: (index: number) => void;
    index: number;
}

const ProjectItem = ({ projectName, removeProject, index }: Props) => {
    return (
        <div className='flex items-center rounded-full border border-black py-1 px-3 justify-between text-[12px] space-x-2'>
            <p className='truncate'>{projectName}</p>
            <button onClick={() => removeProject(index)}>x</button>
        </div>
    )
}

export default ProjectItem