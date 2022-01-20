import { Component } from 'react';
import './charList.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            chars: [],
            loading: true,
            error: false
        }
    }
    
    marvel = new MarvelService();
    
    componentDidMount() {
        this.marvel.getAllCharacters().then(this.onCharsLoaded)
        .catch(this.onError)
    }
    
    onCharsLoaded = (res) => {
        const chars = res.map((item) => {
            return (
                <CharListItem key={item.id} onChangeCharInfoId={() => this.props.onChangeCharInfoId(item.id)} name={item.name} 
                thumbnail={item.thumbnail}/>
            )
        })
        this.setState({
            chars,
            loading: false,
            error: false
        })
    }
    
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    
    renderItems = () => {
        const {chars, loading, error} = this.state;
        if (loading) {
            return (
                <Spinner/>
            )
        }else{
            if (error) {
                return (
                    <ErrorMessage/>
                )
            }else{
                return (
                    <ul className="char__grid">
                        {chars}
                    </ul>
                )
            }
        }
    }
    
    render() {
        return (
            <div className="char__list">
                {this.renderItems()}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }        
}

const CharListItem = ({name, thumbnail, onChangeCharInfoId}) => {
    const style = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : {objectFit: 'cover'};
    return(
        <li onClick={onChangeCharInfoId} className="char__item">
            <img style={style} src={thumbnail} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
}
export default CharList;