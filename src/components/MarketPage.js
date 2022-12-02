import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Item from './Item';
import TopBar from './Tops/TopBar';
import InsertButton from './Support/InsertProductButton';
import CartContext from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import dotenv from 'dotenv';
dotenv.config();

export default function MarketPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [cart, setCart] = useState([]);

  const [codigoPesquisa, setCodigoPesquisa] = useState('');
  const [produtolido, setProdutolido] = useState([]);

  const context = useContext(UserContext);
  const userMaster = context.user.user;

  const API_LOCAL = process.env.REACT_APP_LOCAL;
  const API_DEPLOY = process.env.REACT_APP_API_BASE_URL;
  const API_LOCALHOST = `${API_LOCAL}/products`
  const API_LOCALDEPLOY = `${API_DEPLOY}/products`

  console.log(process.env.REACT_APP_LOCAL)
  console.log(process.env.REACT_APP_API_BASE_URL)


  useEffect(() => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    
    //const request = axios.get(`${API_LOCALDEPLOY}`, config);
    //const request = axios.get(`${API_LOCALHOST}`, config);
    const request = axios.get(`http://localhost:5000/products`, config);

    request.then(response => {
      setItems(response.data);
    });

    request.catch(error => {
      console.log(error);
    });
  }, []);

  function addToCart(item) {
    setCart([...cart, item]);
  }

  const sumPrices = cart.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
  const buyedItems = cart.map(item => item.name).reduce((prev, curr) => prev +  curr + ", ", "");
  
  function BuyItems(){
    let t1=encodeURIComponent("Olá, os seguintes itens foram retirados:\n");
    let t2=encodeURIComponent(`Itens retirados: ${buyedItems}\n`)
    let finalValue=encodeURIComponent(`\nValor total dos itens retirados: R$ ${sumPrices.toFixed(2)} `);

      function finalizarPedido(){
          let nome=userMaster.name;
          let endereco=userMaster.city;
          let t5=encodeURIComponent("\nCompra realizada no nome de: " + nome);
          let t6=encodeURIComponent("\nEndereço: " + endereco);
          window.open("https://wa.me/+5547996993721?text="+t1+t2+finalValue+t5+t6);
      }
      finalizarPedido()
  }

  function buildItems() {
    if (items) {
      return items.map(item => <Item key={item.id} item={item} />);
    }

    return 'Não há items a serem visualizados!';
  }

  function submitCodigo(event) {

    event.preventDefault();

    const body = {
      codigo: codigoPesquisa
    };
    const request = axios.post("http://localhost:5000/rfidtag", body);


    request.then(response => {
      setCodigoPesquisa("");
      setProdutolido(response.data);

    });

    request.catch(error => {
      if(error){
        alert("Dados incorretos!");
      }
  });

  }

  if(userMaster.name==="master"){
    return (
      <CartContext.Provider value={{ cart, addToCart }}>
      <Margin>
      <TopBar />
        <Container>
          <InsertButton onClick={()=>navigate("/createproduct")} >Inserir mais produtos</InsertButton  >
          <InsertButton onClick={()=>navigate("/tagproduto")} >Relacionar produto com tag</InsertButton  >
          
          {buildItems()}
        </Container>
      </Margin>
    </CartContext.Provider>
    )
  }
  else{
    return (
      <CartContext.Provider value={{ cart, addToCart }}>
        <Margin>
        <TopBar />
          <Container>
            <h1>Adquira seus produtos abaixo!</h1>
            <button onClick={BuyItems} >Finalizar o pedido</button>

            <Form2 onSubmit={submitCodigo}>
                      <input type="text" placeholder="Digite o código" id="codigo" value={codigoPesquisa} onChange={e => setCodigoPesquisa(e.target.value)}/>
                      <button type='submit' > Ler tag </button>
            </Form2>

            {produtolido.map((item, index)=>(
                      <Recommendation>
                          <Titles>
                              <h1>{item.name}</h1>
                              <h3>{item.description}</h3>
                              <h3>Preço: R${item.price} </h3>
                          </Titles>
                      </Recommendation>
            ))}

            
            {buildItems()}
          </Container>
        </Margin>
      </CartContext.Provider>
    );
  }

  
}
const Recommendation = styled.div`
  margin-top: 8px;
  border: 2px solid black;
  min-width: 300px;
  min-height: 120px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-sizing: border-box;
  
  img{
    height: 100px;
    width: 100px;
  }
  h2{
    display: flex;
    flex-direction: row;
    font-size: 20px;
    h1{
      color:red;
      font-size: 20px;
      margin-right: 2px;
    }
  }
`
const Titles = styled.div`
  display: flex;
  flex-direction: column;
  h1{
    color:black;
    font-size: 28px;
  }
  h3{
    margin: 3px 3px 3px 0;
  }
`

const Form2 = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 36px;
    margin-left: 36px;
    margin-top:20px;
    input {
        height: 30px;
        margin-right: 36px;
        margin-left: 36px;
        min-width: 80px;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px solid #D4D4D4; 
        padding-left:11px ;
        box-sizing: border-box;
    }
    input::placeholder {
        color: grey;
        font-size: 20px;
        font-style: italic;
        box-sizing: border-box;
    }
    button {
        min-width: 60px;
        height: 35px;
        margin-right: 36px;
        margin-left: 36px;
        text-align: center;
        background: #0384fc;
        color: #FFFFFF;
        font-size: 21px;
        border: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        a{
            text-decoration: none;
        }
        
    }
`

const Margin = styled.div`
  margin-top: 100px;
  background-color: #38b6ff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  h1{
    font-size: 15px;
  }
  align-items: center;
  margin-top: 100px;
  padding: 20px;
  background-color: #bee1f4;
  button{
    height: 50px;
    width: 100%;
    background-color: ${props =>
      typeof props.active !== 'boolean' || props.active ? "#FFFFFF" : '#FFFFFF'};
    color: #38b6ff;
    font-weight: bold;
    font-size: medium;
    font-family: 'Lexend Deca', sans-serif;
    padding: 14px;
    ${props => !props.noMargin && 'margin-bottom: 10px;'}
    border-radius: 8px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    cursor: pointer;
  }
`;
