import '../charList/charList.scss'

const CharListItem = ({name,thumbnail}) => {
    const imageDidNotFound = thumbnail.includes('image_not_available'),
        style=imageDidNotFound ? {objectFit: 'contain'} : {objectFit: 'cover'};
    return(
        <li className="char__item">
            <img style={style} src={thumbnail} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharListItem;