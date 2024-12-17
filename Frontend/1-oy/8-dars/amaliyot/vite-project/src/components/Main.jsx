import CardComponent from "./Card";
import MyCorousel from "./MyCorusel";
import MyAccordion from './MyAccordion'

export default function Main() {
    return (
        <div className="grow py-10">
            <section className="container mx-auto mb-10">
                <CardComponent />
            </section>
            <section className="container mx-auto mb-10" >
                <MyCorousel />
            </section>
            <section className="container mx-auto">
                <MyAccordion/>
            </section>
        </div>
    );
}