import Head from 'next/head'

const About = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Head>
                <title>About</title>
            </Head>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'left', marginTop: '100px'}}>
                <h1>Om NAV Data</h1>
                <div style={{textAlign: 'left',  minWidth: '400px', maxWidth: '800px'}}>
                    <p>
                        NAV Data er NAVs markedsplass for deling av data og innsikt.<br/> Dette er stedet hvor vi ønsker
                        at
                        alle
                        team
                        i NAV skal dele data fra sine domener for analytisk bruk.<br/> Det er også et sted hvor innsikt
                        man
                        finner i
                        data kan deles.
                    </p>
                    <p>

                        Data deles fra teamene som <a
                        href={'https://docs.knada.io/dataprodukter/definisjon/'}>dataprodukter</a>.<br/>
                        Dataprodukter som ikke inneholder personopplysninger eller andre sensitive data vil som regel
                        kunne
                        være
                        åpent tilgjengelig for alle ansatte i NAV å ta i bruk.<br/>
                        Dataprodukter av mer sensitiv art vil typisk ha mer begrensede tilganger, men felles for alle
                        dataprodukter er at alle ansatte i NAV kan lese metadata
                        og beskrivelser av hvilke data som finnes. Dette skal gjøre det enkelt å finne de dataene man
                        har
                        behov
                        for.
                    </p>
                    <p>
                        Innsikt fra data kan deles på markedsplassen som <a
                        href={'https://docs.knada.io/dele-innsikt/datafortelling'}>datafortellinger</a> eller <a
                        href={'https://docs.knada.io/dele-innsikt/metabase'}>spørsmål og dashboards i
                        visualiseringsverktøyet Metabase</a>.
                        Utdypende dokumentasjon for datamarkedsplassen og tilknyttede verktøy finnes på <a
                        href={'https://docs.knada.io/'}>docs.knada.io</a>.</p>
                    <p>
                        Spørsmål og diskusjoner om markedsplassen foregår på slack i <a
                        href={'https://nav-it.slack.com/archives/CGRMQHT50'}>#nada</a>
                    </p>
                </div>
            </div>
        </div>
  )
}
export default About
