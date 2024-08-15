import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase"
import { v4 } from "uuid"

/*
* Herhangi bir medya içeriğini (foto,video,ses,dosya,belge) veritabanlarına doğrudan kaydetmeyiz. Bu soruna çözüm olarak medya içeriklerini sadece medya verisini depolaması için tasarlanmış olan yapılarda depolayıp medyaya erişmek için kullanılan url adreslerini veritabanında saklarız
*/


// bu fonksiyondan beklentimiz dosyayı alıp firebase storage a yükleyip ardından url'ini return etmesi
const upload= async (file)=>{
    // 1) dosya resim değilse veya dosya yoksa fonksiyonu durdur
    if(!file?.type.startsWith("image") || !file){
        return null
    }
    console.log(file)
    // 2) dosyanın yüklenecegin konumun referansını al
    const imagaRef=ref(storage, v4() + file.name)

    // 3) referansını olusturdugumuz konuma dosyayı yükle
    await uploadBytes(imagaRef,file)

    // 4) yüklenen dosyanın url ini al ve return et
    return await getDownloadURL(imagaRef)
}

export default upload