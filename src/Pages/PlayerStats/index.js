import { useState, useEffect, useContext, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import PlayerStatsHeader from "../../components/PlayerStatsHeader";
import { DARK_GRAY, DARK_GREEN, LIGHT_BLACK, LIGHT_GRAY, LIGHT_GREEN, WHITE } from "../../components/Variables";
import ViewLightDark from "../../components/ViewLightDark";
import { NFLStatusContext } from "../../components/NFLStatusContext";
import Tooltip from "react-native-walkthrough-tooltip";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from '@expo/vector-icons';

const PlayerStats = ({route}) => {
    const {season} = useContext(NFLStatusContext);
    const [seasonToShowStats, setSeasonToShowStats] = useState(season)

    const player = route.params?.playerObject;
    const [playerSeasonStats, setPlayerSeasonStats] = useState(null);

    const [rowStatsColored, setRowStatsColored] = useState(null);
    const [showTip, setTip] = useState(null)

    const statsToShow = {
        "RB" : ['rush_yd', 'rush_ypa', 'rush_att','rush_yac', 'rush_td', 'rush_rz_att', 'rush_td_lng', 'rush_lng', 'rec_yd', 'rec','rec_td', 'rec_ypt',  'rec_tgt', 'off_snp'],
        "QB": ['pass_yd','pass_td','pass_att','cmp_pct','pass_int','pass_rz_att','rush_yd','rush_td','rush_att','off_snp'],
        "WR": ['rec','rec_yd', 'rec_tgt', 'rec_lng','rec_td','rush_yd', 'rush_ypa', 'rush_att', 'rush_td','off_snp'],
        "TE": ['rec','rec_yd', 'rec_tgt', 'rec_lng','rec_td','rush_yd', 'rush_ypa', 'rush_att', 'rush_td','off_snp']
    }

    useEffect(() => {
        getPlayerStats(player.player_id, 'regular', season);
        console.log(player.player_id)
    }, [])

    const objectToArray = (obj) => {
        return Object.keys(obj).map((key) => {return key})
    }

    const statsToShowName = (position) => {
        return statsToShow[position].map(stat => { 
            return stat.replace(/\boff_snp\b/g,'Snaps').replace(/\bpass_yd\b/g,'Jardas passadas').replace(/\bpass_td\b/g,'TDs passados').replace(/\bpass_att\b/g,'Passes tentados').replace(/\bcomp_pct\b/g,'Porcentagem (%) de passes completos').replace(/\bpass_int\b/g,'Interceptações').replace(/\bpass_rz_att\b/g,'Tentativas de passe na RZ').replace(/\brush_yd\b/g,'Jardas corridas').replace(/\brush_ypa\b/g,'Jardas corridas por tentativa').replace(/\brush_att\b/g,'Total de corridas tentadas').replace(/\brush_yac\b/g,'Jardas corridas após contato').replace(/\brush_td\b/g,'TDs corridos').replace(/\brush_rz_att\b/g,'Corridas na RedZone').replace(/\brush_td_lng\b/g,'TD mais longo').replace(/\brush_lng\b/g,'Corrida mais longa (em jardas)').replace(/\brec_yd\b/g,'Jardas recebidas').replace(/\brec_lng\b/g,'Recepção mais longa (em jardas)').replace(/\brec\b/g,'Recepções').replace(/\brec_ypt\b/g,'Jardas recebidas por alvo').replace(/\brec_td\b/g,'TDs recebidos').replace(/\brec_tgt\b/g,'Alvos de passe');
        });
    }

    const getColorTeam = (team) => {
        let color;
        switch(team) {
            case 'LAC':
                color = 'rgb(0, 34, 68)'
                break;
            case 'KC':
                color = 'rgb(227, 24, 55)'
                break;
            case 'LV':
                color = 'rgb(165, 172, 175)'
                break;
            case 'DEN':
                color = 'rgb(251, 79, 20)'
                break;     
            case 'NE':
                color = 'rgb(0, 34, 68)'
                break;
            case 'NYJ':
                color = 'rgb(32, 55, 49)'
                break;
            case 'MIA':
                color = 'rgb(0, 142, 151)'
                break;
            case 'BUF':
                color = 'rgb(0, 51, 141)'
                break;
            case 'BAL':
                color = 'rgb(36, 23, 115)'
                break;
            case 'CLE':
                color = 'rgb(49, 29, 0)'
                break;
            case 'PIT':
                color = 'rgb(255, 182, 18)'
                break;
            case 'CIN':
                color = 'rgb(251, 79, 20)'
                break;
            case 'TEN':
                color = 'rgb(0, 34, 68)'
                break;
            case 'JAX':
                color = 'rgb(0, 103, 120)'
                break;
            case 'IND':
                color = 'rgb(0, 44, 95)'
                break;
            case 'HOU':
                color = 'rgb(3, 32, 47)'
                break;
            case 'TB':
                color = 'rgb(213, 10, 10)'
                break;
            case 'CAR':
                color = 'rgb(0, 133, 202)'
                break;
            case 'ATL':
                color = 'rgb(167, 25, 48)'
                break;
            case 'NO':
                color = 'rgb(177, 177, 177)'
                break;
            case 'LAR':
                color = 'rgb(0, 34, 68)'
                break;
            case 'SEA':
                color = 'rgb(0, 34, 68)'
                break;
            case 'SF':
                color = 'rgb(170, 0, 0)'
                break;
            case 'ARI':
                color = 'rgb(151, 35, 63)'
                break;
            case 'GB':
                color = 'rgb(32, 55, 49)'
                break;
            case 'DET':
                color = 'rgb(0, 118, 182)'
                break;
            case 'CHI':
                color = 'rgb(11, 22, 42)'
                break;
            case 'MIN':
                color = 'rgb(79, 38, 131)'
                break;
            case 'NYG':
                color = 'rgb(11, 34, 101)'
                break;
            case 'DAL':
                color = 'rgb(0, 34, 68)'
                break;
            case 'PHI':
                color = 'rgb(0, 76, 84)'
                break; 
            case 'WAS':
                color = 'rgb(90, 20, 20)'
                break;
            default:
                color = DARK_GREEN;
        }
        return color
    }

    const getPlayerStats = async(_player_id, _type, _year) => {
        const URL = `https://api.sleeper.com/stats/nfl/player/${_player_id}?season_type=${_type}&season=${_year}&grouping=week`;
        //console.log(URL);

        fetch(URL)
        .then(response => response.json())
        .then((data) => {
            setPlayerSeasonStats(data)
        }).catch(e => {
            console.log('Error:',e)
        })
    }

    const TooltipMessage = ({children, message,position, hasBackground, index}) => (
        <Tooltip
            isVisible={(showTip==index) ? true : false}
            content={
                   <View>
                     <Text style={{color:WHITE}}> {message} </Text>
                   </View>
            }

            onClose={() =>setTip(null)}
            placement={position}
            backgroundColor={(hasBackground) ? 'rgba(0,0,0,0.5)' :'rgba(0,0,0,0)'}
            useReactNativeModal={true}
            contentStyle={{backgroundColor:DARK_GREEN}}
        >
            {children}
        </Tooltip>
    )

    const StatsRowTitle = (props) => (
        <Pressable onPress={() => setTip(props.index)}>
            <TooltipMessage index={props.index} position='top' message={props.message} hasBackground={true}>
                <Text style={[styles.columnTitle,{color:(showTip==props.index) ? WHITE: DARK_GRAY}]}>{props.name}</Text>
            </TooltipMessage>
        </Pressable>
    )

    const InfoContainer = (props) => {
        return (
            <View style={{flexDirection:'row',marginTop:10}}>
                <Text style={styles.titleInfo}>{props.title}</Text>
                <Text style={styles.valueInfo}>{props.value}</Text>
        </View>
        )
    }

    const Informations = () => (
        <>
        <InfoContainer title='Posição' value={player.fantasy_positions} />
        <InfoContainer title='Time' value={player.team} />
        <InfoContainer title='Idade' value={player.age} />
        <InfoContainer title='Altura' value={`${player.height[0]}'${player.height[1]}"`} />
        <InfoContainer title='Peso' value={`${player.weight} lbs`} />
        <InfoContainer title='Status' value={player.status} />
        <InfoContainer title='Posição no depth chart' value={player.depth_chart_order} />
        <InfoContainer title='Temporadas na NFL' value={player.years_exp} />
        <InfoContainer title='College' value={player.college} />
        </>
    )

    const MenuYearsStats = () => {
        let arr = new Array(player.years_exp + 1).fill(0).map((item, index) => {
            return season - index
        });

        return (
            <View style={{flexDirection:'row',padding:10}}>
            <SelectDropdown
                data={arr}
                defaultValue={seasonToShowStats}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setSeasonToShowStats(selectedItem);
                    getPlayerStats(player.player_id, 'regular', selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                renderDropdownIcon={isOpened => {
                    return <Entypo name={isOpened ? 'chevron-up' : 'chevron-down'} color={LIGHT_GRAY} size={18} />;
                  }}
                buttonStyle={{backgroundColor:LIGHT_BLACK,width:100,borderRadius:5,height:40}}
                buttonTextStyle={{color:LIGHT_GRAY,fontSize:15}}
                dropdownStyle={{backgroundColor:LIGHT_BLACK,borderRadius:5}}
                rowTextStyle={{color:LIGHT_GRAY,}}
                rowStyle={{borderBottomColor:'transparent'}}
            />
            </View>
        )
    }

    return ( 
        <PlayerStatsHeader player={player}>
            <ViewLightDark title={`${player.full_name} #${player.number}`} titleSize={20}>
                <Informations />
            </ViewLightDark>

            <MenuYearsStats />

            <ViewLightDark>
                <ScrollView horizontal={true} contentContainerStyle={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row',alignItems:'flex-start',marginBottom:10}}>
                        <StatsRowTitle index={1} message={`Semana em que o jogo ocorreu`} name='semana' />
                        <StatsRowTitle index={2} message={`Time contra o qual o jogador performou as estatísticas`} name='opp' />
                        {
                            statsToShow[player.position]?.map((stat, i) => {

                                return (<StatsRowTitle key={i} index={i+3} message={statsToShowName(player.position)[i]} name={stat} />)
                            })
                        }
                    </View>

                {playerSeasonStats && 
                    Object.entries(playerSeasonStats).map((item, index) => {
                        //if(!item[1]) return

                        return (
                            <Pressable key={index} onPress={() => setRowStatsColored((rowStatsColored==index) ? null : index)}>
                            <View style={{flexDirection:'row',height:30,justifyContent:'center',borderRadius:5,alignItems:'center',backgroundColor:(rowStatsColored==index) ? getColorTeam(player.team) : (index % 2 == 0) ? 'rgba(255,255,255,0.1)' : 'transparent'}} >
                                <Text style={styles.columnValue}>{item[0]}</Text>
                                <Text style={styles.columnValue}>{(item[1]) ? item[1].opponent : '-'}</Text>
                                { 
                                    statsToShow[player.position]?.map((stat, i) => {

                                        if(!item[1]) {
                                            return (
                                                <Text key={i} style={styles.columnValue}>-</Text>
                                            )
                                        }
                                        else if(!item[1].stats[stat]) {
                                            return (
                                                <Text key={i} style={styles.columnValue}>-</Text>
                                            )
                                        } else {
                                            return (
                                                <Text key={i} style={styles.columnValue}>{item[1].stats[stat]}</Text>
                                            )
                                        }
                                    })
                                }
                            </View>
                            </Pressable>
                        )
                        
                     })
                }
                </ScrollView>
            </ViewLightDark>
        </PlayerStatsHeader>
     );
}
 
export default PlayerStats;

const styles = StyleSheet.create({
    text: {
        color:WHITE
    },
    titleInfo: {
        flex:1,
        color:DARK_GRAY
    },
    valueInfo: {
        flex:1,
        color:WHITE,
        textAlign:'right'
    },
    columnTitle: {
        flex:1,
        color:DARK_GRAY,
        width:80,
        marginRight:10,
        textAlign:'center'
    },
    columnValue: {
        flex:1,
        color:WHITE,
        width:70,
        marginRight:10,
        textAlign:'center'
    }
})