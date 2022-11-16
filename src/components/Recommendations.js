import { useContext, useEffect, useState, React } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import RecommendationTopBar from './Tops/TopBarRecommendations';
import { UserContext } from '../contexts/UserContext';
import UserRecommendationCreate from './Support/CreateRecommend'

export default function RecommendationsPage() {
  const { user } = useContext(UserContext);
  // const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);






  // let likeoutline="thumbs-up-outline";
  // const [type, setType] = React.useState(likeoutline);
  // const [classe, setClas] = React.useState("");

  // function Heart(props){
  //   return(
  //       <ion-icon name={props.type} class={props.class} onClick={like}></ion-icon>
  //   );
  // }

  // function like(){
  //   if(type==likeoutline){
  //       setType("thumbs-up");
  //       setClas("like");
  //   }else{
  //       setType("thumbs-up-outline");
  //       setClas("");
  //   }   
  // }









  async function Favorite(id) {
        
    try {
        await axios.post(`https://projeto-autoral-guilherme.herokuapp.com/${id}/upvote`)
  
        setIsFavorite(!isFavorite);
        renderPosts();
        
    } catch (e) {

    }
  }

  async function Deslike(id) {
      try {
          await axios.post(`https://projeto-autoral-guilherme.herokuapp.com/${id}/downvote`);

          setIsFavorite(false);
          renderPosts();
      } catch (e) {
          
      }
  }

  function renderPosts(){
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    
    const request = axios.get('https://projeto-autoral-guilherme.herokuapp.com/recommendations', config);

    request.then(response => {
      setItems(response.data);
    });

    request.catch(error => {
    });
  }

  useEffect(() => {
    renderPosts();
  }, []);

  return (
    
    <Edit>
        <RecommendationTopBar />
     <Container>
        <InfoRoute>
            <h2> O que você deseja que nossa loja venda? </h2>
            <h2>Insira abaixo!</h2>
        </InfoRoute>
        <UserRecommendationCreate></UserRecommendationCreate>
        <AddRecommendation>
              <h2> Avalie com "Gostei" ou "Não gostei"  :) </h2> 
              <Border></Border>
            {items.map((item, index)=>(
              <Recommendation>
                <Titles>
                    <h1>{item.name}</h1>
                    <h3>{item.description}</h3>
                </Titles>
                
                <img  src={item.image} alt={item.name} />
                <h2> <h1>Preço: </h1>  R${item.price.toFixed(2).replace('.', ',')}</h2>
                
                <Score >
                  <h4> {item.score} |</h4>
                  {isFavorite ? <ion-icon onClick={ ()=> Deslike(item.id)} name="thumbs-up"></ion-icon> :
                                <ion-icon  onClick={ ()=> Favorite(item.id)} name="thumbs-up"></ion-icon>
                  }
                  {isFavorite ? <ion-icon onClick={ ()=> Favorite(item.id)} name="thumbs-down"></ion-icon> :
                                <ion-icon  onClick={ ()=> Deslike(item.id)} name="thumbs-down"></ion-icon>
                  }
                </Score>

              </Recommendation>
            ))}
        </AddRecommendation>
        
       
      </Container>
    </Edit>
    
    
     
  );
}

const Border = styled.div`
  margin-top: 8px;
  height: 1px;
  width: 100%;
  background-color: black;
`

const Edit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`

const Score = styled.div`
  margin-top: 5px;
  height: 30px;
  display: flex;
  flex-direction: row;
  h4{
    font-size: 20px;
    margin-right: 3px;
  }
  ion-icon{
    margin-left: 6px;
    margin-right: 4px;
    font-size: 25px;
    color: #${props => props.iconColor};
  }
`

const Recommendation = styled.div`
  margin-top: 8px;
  border-bottom: 2px solid black;
  min-width: 300px;
  min-height: 200px;
  display: flex;
  align-items: center;
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

const InfoRoute=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    h2{
        font-weight: bolder;
    }
`
const AddRecommendation=styled.div`
  display: flex;
  margin-top: 1px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  h2{
        font-weight: bolder;
        margin-top: 8px;
    }
`
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  margin-top: 100px;
  min-height: 100vh;
  width: 80%;
  padding: 27px 20px;
  background-color: #bee1f4;
  body {
	overflow: hidden;
  }
  overflow: hidden;


`;
