import { File } from "@/types";

const FileGroupCard = ({ file }: { file: File }) => {

    console.log(file);
    
    return (
        <div>
            <h1>{file.filename}</h1>
            <h1>{file.createdAt}</h1>
        </div>
    )
}

export default FileGroupCard;   