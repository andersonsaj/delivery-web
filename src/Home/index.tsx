import './styles.css';
import {ReactComponent as HomeImg} from './home.svg'

function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="home-actions">
                    <h1 className="homr-title">
                    Faça seu pedido <br/> que entregamos <br/> pra você!!!
                    </h1>
                    <h3 className="home-subtitle">
                    Escolha o seu pedido e em poucos minutos <br/>
                    levaremoss na sua porta
                    </h3>
                    <a href="orders" className="home-btn-order">FAZER PEDIDO</a>
                </div>
                <div className="home-image">
                    <HomeImg />
                </div>
            </div>
        </div>
    )
}

export default Home;