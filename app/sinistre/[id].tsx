import fetchData from "@/hooks/fetchData";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, Switch, Text } from "react-native-paper";

type SinistreType = {
    id: number | string,
    immatriculation?: string,
    est_assure?: boolean
    date_heure_appel?: any,
    date_heure_sinistre?: any,
    status?: string,
    contexte?: string,
    pourcentage_responsabilite?: any,
    est_responsable?: boolean
    user_client_id?: any,
    user_salarie_id?: any
}

export default function SinistreDetailScreen() {
    // implémenter un state local pour charger le sinistre localement
    const [ sinistre, setSinistre ] = useState<SinistreType>()

    // récupérer le paramètre d'URL
    const { id } = useLocalSearchParams<{ id: string }>();

    // fetch récupérer le sinistre courant
    useEffect(() => {
        fetchData('/sinistre/'+id, 'GET', {}, true)
            .then(data => {
                console.log('Sinistre data ', data)
                const { results } = data;
                setSinistre(results)
            })
            .catch(err => {
                console.log('Error on get sinistre ' + err.message)
            })
    }, [id])

    if(!sinistre) {
        return (
            <View>
                <Text>Le sinistre est introuvable !</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <Card
                key={sinistre.id}
            >
                <Card.Title title="Mon sinistre" />
                <Card.Content>
                    <Text>Plaque : {sinistre.immatriculation}</Text>
                    <Text>Date du sinistre : {sinistre.date_heure_sinistre}</Text>
                    <Text>Date de signalement du sinistre : {sinistre.date_heure_appel}</Text>
                    <Text>Contexte du sinistre : {sinistre.contexte}</Text>
                    <Text>Pourcentage responsabilité : {sinistre.pourcentage_responsabilite}</Text>
                    <Text>Responsabilité conducteur : {sinistre.est_responsable}</Text>

                </Card.Content>
            </Card>
        </ScrollView>
    )
}