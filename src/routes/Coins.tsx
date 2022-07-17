import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { fetchCoins } from '../api'

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`
const Header = styled.header`
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CoinsList = styled.ul``
const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 15px;
    a {
        /* padding: 20px; */
        display: flex;
        align-items: center;
        transition: color 0.5s ease-in;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor}
        }
    }
`

const Title = styled.h1`
    font-size: 48px;
    color: ${props=>props.theme.accentColor};
`

const Loader = styled.div`
    text-align: center;
`

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`


interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type:string
}
function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins) // 리액트쿼리가 데이터를 캐시에 저장해두기때문에 다시 페이지로 돌아왔을때 로딩이 생기지 않음.

    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? (
                'Loading...'
            ) : (
            <CoinsList>
                {data?.slice(0, 100).map(coin => <Coin key={coin.id}>
                    <Link to={`/${coin.id}`} state={{name: coin.name}}>
                        <Img src={ `https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}` }/>
                        {coin.name} &rarr;
                    </Link>
                </Coin>)}
            </CoinsList>)}
        </Container>
    )
}

export default Coins