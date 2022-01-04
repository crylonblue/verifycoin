const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;


function lineBreaks(content) {
    return content.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

function parseLinks(content) {
    const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    return content.replace(reg, "<a href='$1$2' target='blank'>$1$2</a>");
}

export default function LinkText (props){
    return (
        <span dangerouslySetInnerHTML={{
            __html: lineBreaks(parseLinks(props.text))
          }}></span>
    )
}