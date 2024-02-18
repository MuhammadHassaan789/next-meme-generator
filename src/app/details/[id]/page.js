import Detail from "./Details"

export default async function detailContainer(props) {
    const ids = props.params.id;
    const res = await fetch('https://api.imgflip.com/get_memes/');
    const result = await res.json();
    const details = result.data.memes;

    const singleDetail = details.find(item => item.id === ids);
    const imageUrl = singleDetail ? singleDetail.url : '';

    const width = singleDetail ? singleDetail.width : '';
    const height = singleDetail ? singleDetail.height : '';

    return (
        <div>
            <Detail singleDetail={singleDetail} imageUrl={imageUrl} width={width} height={height} params={props.params} />
        </div>
    );
}

