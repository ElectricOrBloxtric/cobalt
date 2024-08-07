export default async function(obj) {
    try {
        let response = await fetch(`https://rumble.com/service.php?name=media.details&url=/${obj.id}`);
        let data = await response.json();

        if (data.videos && data.videos.length > 0) {
            let videoUrl = data.videos[0].url;
            let title = data.title || `rumble_${obj.id}`;
            let cleanTitle = title.replace(/\.html$/, '');

            return {
                urls: videoUrl,
                filename: `${cleanTitle}.mp4`,
                audioFilename: `${cleanTitle}_audio`
            };
        } else {
            return { error: 'ErrorNoVideosFound' };
        }
    } catch (error) {
        return { error: 'ErrorFetchingData' };
    }
}
