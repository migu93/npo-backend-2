const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024, // ограничиваем размер файла до 4MB
    },
});
export default upload