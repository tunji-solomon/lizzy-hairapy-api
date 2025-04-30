import multer  from 'multer';
import path  from 'path';



const storage = multer.diskStorage({

    destination: function(req : any, file : any, cb){
        cb(null, 'uploads')
    },
    filename: function(req : any, file : any, cb){
        cb(null, 
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    }
})


const isImage = (req : any, file : any, cb : any) => {

    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new Error('File type must be an image'))
    }
}

const limit : any = {
    fileSize : 5 * 1024 * 1024 //5mb
}

export default multer({
    storage: storage,
    fileFilter: isImage,
    limits: limit.fileSize
})