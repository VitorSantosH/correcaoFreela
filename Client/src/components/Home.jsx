import React, { Component } from "react";
import { Link } from "react-router-dom";


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    }
};
class Home extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            doctype:""
        }
    }
    
    render(){
        return(
        <React.Fragment>
        <header>
            <div className="container">
            <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="#"><img src="https://bancorappi.com/images/brand.png" alt="" className="brand"/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Casa</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/#sobreNos">Sobre nós</a>
                        </li>  
                        <li className="nav-item">
                        <a className="nav-link" href="/#servicos">Recursos</a>
                        </li> 
                        <li className="nav-item">
                        <a className="nav-link" href="/#parceiros">Sócios</a>
                        </li>  
                        <li className="nav-item">
                        <a className="nav-link" href="/#cardPrime">RappiCard</a>
                        </li>
                    </ul>
                    </div>
                </nav>
            </div>
        </header>

        <section className="hero">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="hero-wrapper">
                    <div className="hero-top">
                        <p>PARA MIM</p>
                    </div>
                    <div className="hero-inner">
                        <h1><span>RappiCard</span> A melhor plataforma de sistema de banco digital</h1>
                        <p>O melhor cartão de crédito com cashback
                            do <span>mercado.</span></p>
                    </div>
                    <div className="hero-bottom">
                        <div className="image-holder">
                            <img src="images/moustache.svg" alt=""/>
                        </div>
                        <p>Dê o primeiro passo para solicitar o seu cartão.</p>
                        <div className="hero-btn">
                            <Link to="/card-app" className="btn">Eu Quero</Link>
                        </div>
                        <div className="rappi-card-txt">
                        <h3>RappiCard</h3>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <img src="images/hero-bg-shape.svg" alt="" className="hero-bg-shape"/>
        <img src="images/hero-shapes.svg" alt="" className="hero-shape"/>
        </section>

        <section className="rappi-card">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="rappi-card-right-sec">
                    <div className="image-holder">
                        <figure><img src="images/rapi-card-main.png" alt=""/></figure>
                    </div>
                    <div className="prime">
                        <h3 id="cardPrime" >Prime</h3>
                    </div>
                </div>
                </div>
                <div className="col-md-6">
                    <div className="rappi-card-left-sec">
                        <div className="rappi-inner">
                        <h2>RappiCard Prime</h2>
                        <p>5% de cashback em compras no Rappi e 2% em todas as outras compras.</p>
                    </div>
                    <div className="rappi-list">
                        <ul>
                            <li><div className="image-holder"><img src="images/entrega.svg" alt=""/></div><div className="list-wrapper"><h4>ENTREGA RÁPIDA</h4><p>Entrega do Fist RabbiCard.</p></div></li>
                            <li><div className="image-holder"><img src="images/support.svg" alt=""/></div><div className="list-wrapper"><h4>SUPORTE 24X7</h4><p>Forneça o melhor suporte.</p></div></li>
                            <li><div className="image-holder"><img src="images/custo.svg" alt=""/></div><div className="list-wrapper"><h4>CUSTO SATISFEITO</h4><p>Custo satisfeito para acreditar.</p></div></li>
                            <li><div className="image-holder"><img src="images/servico.svg" alt=""/></div><div className="list-wrapper"><h4>SERVIÇO SEGURO</h4><p>Melhores serviços de despacho.</p></div></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </section>

        <section className="nossos">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="nossos-top-text">
                        <h2 id="servicos">Nossos serviços</h2>
                        <p>Temos os melhores serviços para a melhor segurança do seu banco digital com RappiCard</p>
                    </div>
                </div>
                    <div className="col-md-4">
                        <div className="nossos-catg">
                        <a href="#">
                        <div className="image-holder">
                            <img src="images/chatbots.png" alt=""/>
                        </div>
                        <div className="nossos-bottom">
                            <h5>Atendimento 24x7, sem chatbots</h5>
                        </div>
                    </a>
                </div>
                    </div>      
                    <div className="col-md-4">
                        <div className="nossos-catg">
                        <a href="#">
                        <div className="image-holder">
                            <img src="images/tudo.png" alt=""/>
                        </div>
                        <div className="nossos-bottom">
                            <h5>Resolva tudo através do aplicativo facilmente</h5>
                        </div>
                    </a>
                    </div>
                    </div>   
                    <div className="col-md-4">
                        <div className="nossos-catg">
                        <a href="#">
                        <div className="image-holder">
                            <img src="images/visa.png" alt=""/>
                        </div>
                        <div className="nossos-bottom">
                            <h5 className="visa-txt">Cartão de metal, <br/> exclusivo</h5>
                        </div>
                    </a>
                    </div>
                    </div>
                        <div className="col-md-4">
                        <div className="nossos-catg nossos-catg-margn">
                        <a href="#">
                        <div className="image-holder">
                            <img src="images/bag.png" alt=""/>
                        </div>
                        <div className="nossos-bottom">
                            <h5>Solicite em minutos e comece a usar na hora em compras online </h5>
                        </div>
                    </a>
                    </div>
                    </div>  
                    <div className="col-md-4">
                        <div className="nossos-catg nossos-catg-margn">
                        <a href="#">
                        <div className="image-holder">
                            <img src="images/nossos-user.png" alt=""/>
                        </div>
                        <div className="nossos-bottom">
                            <h5>Exclusivo para usuário Rappi Prime</h5>
                        </div>
                    </a>
                    </div>
                    </div>  
                    <div className="col-md-4">
                        <div className="nossos-catg nossos-catg-margn">
                        <a href="#">
                        <div className="image-holder">
                            <img src="images/instaling.png" alt=""/>
                        </div>
                        <div className="nossos-bottom">
                            <h5>Anuidade: 12x de 89,99</h5>
                        </div>
                    </a>
                    </div>
                    </div>
            </div>
        </div>
        </section>
        
        <section className="cashback">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="cashback-left">
                            <div className="cashback-tittle">
                               
                                <h2>Cashback de verdade, para <br/>
                                gastar quando e onde você quiser!</h2>
                                <p>Veja o quanto você pode receber de <br/>
                                    cashback com o RappiCard Prime</p>
                            </div>
                            <div className="image-holder">
                                <figure><img src="images/chashback-main.png" alt=""/></figure>
                            </div>
                        </div> 
                    </div>
                    <div className="col-md-4">
                        <div className="cashback-right">
                        <div className="simulacao-main">
                            <div className="simulacao-inner">
                            <h2>Simulação</h2>
                            <p>Gasto mensal no Rappi</p>
                            <p>R$ 4.000,00</p>
                            <p>Gasto mensal fora do Rappi</p>
                            <p>R$ 6.000,00</p>
                        </div>
                        <div className="simulacao-inner-left">
                            <div className="image-holder">
                                <img src="images/moustache-2.svg" alt=""/>
                            </div>
                            <div className="inner-left-box">
                                <p>Seu cashback no ano</p>
                                <p>R$ 3.840</p>
                            </div>
                        </div>
                        <div className="rapi-prime">
                        <h3>RappiCard Prime</h3>
                    </div>
                        </div> 
                        </div>
                    </div>
                </div>
            </div>
            <img src="images/cashback-bg.svg" alt="" className="cashback-bg"/>
        </section>
        
        <section className="rappi-card beneficios">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <div className="rappi-card-right-sec">
                        <div className="image-holder">
                            <figure><img src="images/beneficios-main.png" alt="" className="img-fluid"/></figure>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                        <div className="rappi-card-left-sec">
                            <div className="rappi-inner">
                            <h2>Benefícios Visa para o seu RappiCard Prime</h2>
                            <p>Todos os benefícios da bandeira Infinite disponíveis no seu cartão</p>
                        </div>
                        <div className="rappi-list">
                            <ul>
                                <li>VISA Luxury Hotel Collection</li>
                                <li>Proteção de preços</li>
                                <li>VISA Concierge</li>
                                <li>Seguro locação de veículos</li>
                                <li>Sala VIP Loungekey</li>
                                <li>Proteção de preços</li>
                                <li>Free Vallet</li>
                                <li>Perda ou roubo de bagagem</li>
                            </ul>
                            <br />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
            
            <section class="cashback rappi-travel">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="travel-top">
                        <div class="image-holder">
                           <a href="#"><img src="images/rappi.png" alt=""/></a> 
                        </div>
                    </div>
                    </div>
                    <div class="col-md-5 col-6">
                        <div class="travel-left-sec">
                            <h2>Se for viajar, <br/> não se esqueça dos</h2>
                            <p>Veja o quanto você pode receber de <br/>
                                cashback com o RappiCard Prime</p>
                                <div class="image-holder">
                                    <figure><img src="images/car.png" alt="" class="img-fluid"/></figure>
                                </div>
                                <div class="travel-left-text">
                                    <h6>de cashback</h6>
                                    <p>Aplicam-se termos e condições</p>
                                </div>
                        <img src="images/rappi-shape-2.svg" alt="" class="shape-2" />
                        </div>
                    </div>
                    <div class="col-md-7 col-6">
                        <div class="travel-right-sec">
                        <div class="image-holder">
                            <figure><img src="images/travel-plane.png" alt="" class="img-fluid" /></figure>
                        </div>
                        <div class="rappi-travel-text">
                            <h3>Rappi travel</h3>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src="images/cashback-bg.svg" alt="" class="cashback-bg"/>
            <img src="images/rappi-shape.svg" alt="" class="shape "/>
          </section>
            <section className="parceiros">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="parceiros-top">
                                    <h2 id="parceiros">Parceiros de lançamento</h2>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <Carousel
                                    swipeable={true}
                                    draggable={true}
                                    responsive={responsive}
                                    infinite={true}
                                    customTransition="all .5"
                                    transitionDuration={500}
                                    customLeftArrow={<div className="swiper-button-prev arrow left arrow--left"><img src="images/slider-left-arrow.svg" alt="" /></div>}
                                    customRightArrow={<div className="swiper-button-next arrow right arrow--right"><img src="images/slider-right-arrow.svg" alt="" /></div>}
                                    containerClass="carousel-container"
                                    deviceType={this.props.deviceType}
                                    itemClass="carousel-item-padding-40-px"
                                    arrows
                                >

                                    <img src="images/nagayama.png" alt="" />
                                    <img src="images/artuio.png" alt="" />
                                    <img src="images/de-betti.png" alt="" />
                                    <img src="images/kitchin.png" alt="" />

                                </Carousel>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="cashback voce">
               <div class="container">
                   <div class="row">
                       <div class="col-md-5">
                           <div class="voce-left">
                               <h2>Você usa, você ganha.
                                Seu cashback na hora.</h2>
                                <p>Além do incrível cashback, os cartões também oferecem um mundo de praticidades, experiências e serviços exclusivos.</p>
                                <div class="voce-btn">
                                <a href="#" class="btn">Solicite o seu</a>
                                </div>   
                                <img src="images/rappi-shape-2.svg" alt="" class="shape-2"/>
                           </div>
                       </div>
                      
                       <div class="col-md-7">
                           <div class="image-holder">
                               <figure><img src="images/voce-main.png" alt=""/></figure>
                           </div>
                       </div>
                   </div>
               </div>
               <img src="images/arrows.svg" alt="" class="arrows"/>
            <img src="images/cashback-bg.svg" alt="" class="cashback-bg"/>
           </section>
            
            <section className="vedio-sec">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                <div className="vedio-sec-top">
                    <h2 id="sobreNos" >O seu Rappicard em 28 minutos!</h2>
                    <p>Rappicard: Muito diferente, muito cashback e rápido, pode chegar em até 28 minutos.</p>
                    <img src="images/rappi-shape-2.svg" alt="" className="shape-2"/>
                </div>
            </div>
            <div className="col-md-12">
                <div className="vedio">
                    <video width="790" height="515" controls>
                        <source src="vedio/product-vedio.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                        </video>
                </div>
            </div>
            </div>
            </div>
            <img src="images/vedio-sec-shape.png" alt="" className="shape "/>
            </section>
        
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="footer-first">
                            <div className="image-holder">
                            <a href="#"><img src="images/footer-logo.svg" alt="" className="footer-brand"/></a>
                            </div>
                            <div className="inner-text">
                                <p>CNPJ n.º 34.378.264/0001-03 / Av. Paulista, 1374 - 6.º andar - São Paulo-SP - CEP <br/> 01310-916</p>
                            </div>
                            <div className="footer-social">
                                <ul>
                                    <li><div className="social-media"><a href="https://www.facebook.com/RappiBankBR/"><img src="images/fb.svg" alt=""/></a></div></li>
                                    <li><div className="social-media"><a href="https://www.linkedin.com/company/rappibankbr/"><img src="images/linkedin.png" alt=""/></a></div></li>
                                    <li><div className="social-media"><a href="https://twitter.com/RappiBankBR"><img src="images/twitter.png" alt=""/></a></div></li>
                                    <li><div className="social-media"><a href="https://www.instagram.com/rappibankbr/?hl=pt"><img src="images/insta.svg" alt=""/></a></div></li>
                                </ul>
                            </div>
                            <img src="images/footer-shape.svg" alt="" className="shape"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="footer-list">
                                <ul>
                                    <li><a href="#">Casa</a></li>
                                    <li><a href="#">Sobre nós</a></li>
                                    <li><a href="#">Recursos</a></li>
                                    <li><a href="#">Sócios</a></li>
                                </ul>
                            </div>
                        </div>   
                        <div className="col-md-2">
                            <div className="footer-list">
                                <ul>
                                    <li><a href="#">RappiCard</a></li>
                                    <li><Link to={'/login'} > Entrar </Link>  </li>
                                    <li><a href="#">Registro</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="image-holder">
                                <a href="#"><img className="visa-img" src="images/footer-visa.png" alt=""/></a>
                            </div>
                        </div>
                        <div className="copy-right">
                            <p>Copyright 2021 Rappipay Instituição de Pagamentos Ltda.</p>
                        </div>
                    </div>
                </div>
                <img src="images/footer-shape-2.svg" alt="" className="footer-shape-2"/>
            </footer>
        </React.Fragment>
        );
    }
}

export default Home;