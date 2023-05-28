import style from './loader.module.css'

const Loader = ({className}) => (
    <div className={className}>
       <div className={style['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
);

Loader.defaultProps = {
    className: ''
};

export default Loader;