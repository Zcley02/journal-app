

export const fileUpload = async (file) => {

    const cloudUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_API_CLOUDINARY}/upload`;

    const formData = new FormData();
    formData.append('upload_preset', 'journal_app');
    formData.append('file', file);

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( resp.ok ){
            const cloudResp = await resp.json();
            console.log(cloudResp.secure_url)
            return cloudResp.secure_url;
        } else{
            return null;
        }

    } catch (error) {
        console.log(error)
    }

}