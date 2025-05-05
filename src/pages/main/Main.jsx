import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import Loader from "../../components/Loader/Loader";
const Main = () => {
    const { t } = useTranslation();
    const lang = i18n.language;
    const url = import.meta.env.VITE_API_URL;
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/car/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Fehler beim Laden der Fahrzeugliste");
            }
        } catch (error) {
            console.error(error);
            toast.error("Serverfehler beim Laden der Daten");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchList();

    }, [])

    return (
        <main>
            <article>

                <section
                    className="hero has-bg-image"
                    aria-label="home"
                    style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                >
                    <div className="container">
                        <div className="hero-content">
                            <p className="section-subtitle :dark">
                                Wir bieten die besten Gebrauchtwagen mit garantierter Qualität
                            </p>
                            <h1 className="h1 section-title">
                                An- und Verkauf von Gebrauchtwagen
                            </h1>
                            <p className="section-text">
                                Entdecken Sie unsere große Auswahl an hochwertigen Gebrauchtwagen zu attraktiven Preisen.
                                Bei uns erhalten Sie Qualität und Vertrauen in jedem Fahrzeug
                            </p>
                            <Link to="/" className="btn">
                                <span className="span">Unsere Fahrzeugangebote</span>
                                <span className="material-symbols-rounded">arrow_forward</span>
                            </Link>
                        </div>

                        <figure
                            className="hero-banner"
                            style={{
                                "--width": "1228",
                                "--height": "789"
                            }}
                        >
                            <img
                                src="/images/hero-banner.png"
                                width="1228"
                                height="789"
                                alt="red motor vehicle"
                                className="move-anim"
                            />
                        </figure>
                    </div>
                </section>

                <section
                    className="section service has-bg-image"
                    aria-labelledby="service-label"
                    style={{ backgroundImage: "url('/images/service-bg.jpg')" }}
                >
                    <div className="container">
                        <p className="section-subtitle :light" id="service-label">Unsere Leistungen</p>
                        <h2 className="h2 section-title">We Provide Great Services For your Vehicle</h2>
                        <ul className="service-list">
                            <li>
                                <div className="service-card">
                                    <figure className="card-icon">
                                        <img src="/images/services-1.png" width="110" height="110" loading="lazy" alt="Engine Repair" />
                                    </figure>
                                    <h3 className="h3 card-title">Gebrauchtwagenverkauf</h3>
                                    <p className="card-text">
                                        Entdecken Sie unsere große Auswahl an geprüften Gebrauchtwagen – Qualität und faire Preise garantiert.
                                    </p>
                                    <a href="/" className="btn-link">👉 Mehr erfahren</a>
                                </div>
                            </li>

                            <li>
                                <div className="service-card">
                                    <figure className="card-icon">
                                        <img src="/images/services-2.png" width="110" height="110" loading="lazy" alt="Brake Repair" />
                                    </figure>
                                    <h3 className="h3 card-title"> An- und Verkauf von Fahrzeugen</h3>
                                    <p className="card-text">
                                        Wir kaufen Ihr Fahrzeug zu besten Konditionen oder helfen Ihnen beim Finden Ihres Traumwagens.
                                    </p>
                                    <a href="/" className="btn-link">👉 Mehr erfahren</a>
                                </div>
                            </li>

                            <li>
                                <div className="service-card">
                                    <figure className="card-icon">
                                        <img src="/images/services-3.png" width="110" height="110" loading="lazy" alt="Tire Repair" />
                                    </figure>
                                    <h3 className="h3 card-title"> Abschlepp- und Transportservice deutschlandweit</h3>
                                    <p className="card-text">
                                        Unser zuverlässiger Abschleppdienst bringt Ihr Fahrzeug sicher an jeden Ort in Deutschland.
                                    </p>
                                    <a href="/" className="btn-link">👉 Mehr erfahren</a>
                                </div>
                            </li>
                        </ul>
                        <Link to="/" className="btn">
                                <span className="span">Alle Services anzeigen</span>
                                <span className="material-symbols-rounded">arrow_forward</span>
                            </Link>
                    </div>
                </section>

                <section className="section work" aria-labelledby="work-label">
                    <div className="container">
                        <p className="section-subtitle :light" id="cars-label">UNSER FAHRZEUGBESTAND</p>
                        <h3 className=" section-title">
                            Entdecken Sie unsere große Auswahl an Fahrzeugen in unserem Ausstellungsraum. Wir bieten Ihnen Fahrzeuge in verschiedenen Modellen und Ausstattungen, die alle Ihre Bedürfnisse erfüllen.
                        </h3>
                        <ul className="has-scrollbar">
                            {loading ? <Loader /> : list.map((item, i) => (
                                <li className="scrollbar-item" key={i}>
                                    <div className="work-card">
                                        <figure className="card-banner img-holder" style={{ "--width": "350", "--height": "406" }}>
                                            <img src={item.image} width="350" height="406" loading="lazy" alt={item.name} className="img-cover" />
                                        </figure>
                                        <div className="card-content">
                                            <p className="card-subtitle">Auto Repair</p>
                                            <h3 className="h3 card-title">{item.name}</h3>
                                            <Link to={`/one-car/${item._id}`} className="card-btn">
                                                <span className="material-symbols-rounded">arrow_forward</span>
                                            </Link>

                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

            </article>
        </main>
    )
}

export default Main
