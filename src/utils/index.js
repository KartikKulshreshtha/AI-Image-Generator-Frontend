import prompts from "../Prompts";
import FileSaver from 'file-saver'
export function getRandomPrompts(item) {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompts = prompts[randomIndex];
    if (randomPrompts === item) {
        return getRandomPrompts(item);
    }
    return randomPrompts;
}

export async function downloadImage(_id, photo){
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}