export default async function(obj) {
    try {
        let response = await fetch(`https://rumble.com/service.php?name=media.details&url=${obj.id}`);
        let data = await response.json();

        if (data.videos && data.videos.length > 0) {
            let videoUrl = data.videos[0].url;
            return {
                urls: videoUrl.replace("http://", "https://"),
                filename: `rumble_${obj.id}.mp4`,
                audioFilename: `rumble_${obj.id}_audio`
            };
        } else {
            return { error: 'ErrorNoVideosFound' };
        }
    } catch (error) {
        return { error: 'ErrorFetchingData' };
    }
}
