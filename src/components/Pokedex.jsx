import React from 'react'
import { useState } from 'react';
import Axios from "axios";
import './Pokedex.css';
import POKEBALL from './pokeball.png';
import {MdCatchingPokemon} from 'react-icons/md';
function Pokedex() {
const [pokemonName, setPokemon] = useState(" ");
const [chosenpokemon, setchosenpokemon] = useState(false);
const [pokemon,setpoke] = useState({
    name:"",
    species:"",
    img:"",
    hp:"",
    attack:"", 
    defense: "",
    type:"",
});

const searchPokemon = ()=>{
    document.getElementById('poke').style.display = 'none';
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((Response)=>{
    // console.log(Response);
    setpoke({
        name: pokemonName,
        species: Response.data.species.name,
        img: Response.data.sprites.front_default,
        hp: Response.data.stats[0].base_stat ,
        attack: Response.data.stats[1].base_stat,
        defense: Response.data.stats [2].base_stat,
        type: Response.data.types[0].type.name,
    });
    setchosenpokemon(true);
    });
};

  return (
    <div className="pokedex">
        <div className="title">
            <h1>POKEDEX</h1>
            <input type="text"
            onChange={(event)=>{
                setPokemon(event.target.value)
            }}
            />
            <button onClick={searchPokemon}><MdCatchingPokemon/></button>
        </div>
        <div className="displayScreen">
            {!chosenpokemon ? (
            <h1> Please choose a Pokemon</h1>
            
        ):(
            <>
             <h1>{pokemon.name}</h1>
             <img src={pokemon.img}/>
             <h3>species: {pokemon.species}</h3>
             <h3>type: {pokemon.type}</h3>
             <h3>hp: {pokemon.hp}</h3>
             <h3>attack: {pokemon.attack}</h3>
             <h3>defence: {pokemon.defense}</h3>

            </>
        )}   
            <img src={POKEBALL} alt="pokeball" id='poke'/>
        </div>
    </div>
  )
}

export default Pokedex