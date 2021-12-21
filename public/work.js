let commitHash, pollingTime, versionUrl
function checkUpdate() {i
    console.log(window.location)
    fetch('location:3000/' + versionUrl + '?time=' + new Date().getTime(), {
        method: 'GET',
    })
        .then((response) => response.text())
        .then((result) => {
            if (commitHash.trim() !== result.trim()) {
                postMessage({
                    type: 'UPDATE',
                })
            }
        })
        .catch((error) => console.log('error', error))
}

// 监听消息
onmessage = function (e) {
    if (e.data.type === 'VERSION' && e.data.hash) {
        pollingTime = e.data.pollingTime
        commitHash = e.data.hash
        versionUrl = e.data.versionUrl
        setInterval(() => {
            checkUpdate()
        }, pollingTime * 1000)
    }
}
