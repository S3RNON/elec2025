"use client";
import { useEffect, useState } from "react";
import "./wonen.css";

class WoonData {
	public totaleLeegstand: number = 0;
	public gemiddeldeLeegstandPerHuishouden: number = 0;
	public aantalDirectHuisvesten: number = 0;
	public aantalLaterHuisvesten: number = 0;
	public gemiddeldePersoonsGroottePerHuishouden: number = 2.1;
	public woonoppervlaktePerPersoon: number = 53;
	public laterTeHuisvestenJaren: number = 0;

	constructor(
		public leegstandPerProvincie: Record<string, number>,
		public woningZoekendeHuishoudens: number,
		public nieuwewoonsnelheid: number,
		public woonOppervlaktePerHuishouden: number = 2.1 * 53
	) {
		this.calculate();
	}

	public calculate() {
		this.totaleLeegstand = Object.values(this.leegstandPerProvincie).reduce(
			(totaal, leegstand) => totaal + leegstand,
			0
		);

		this.gemiddeldeLeegstandPerHuishouden =
			this.totaleLeegstand / this.woningZoekendeHuishoudens;

		this.aantalDirectHuisvesten =
			this.totaleLeegstand / this.woonOppervlaktePerHuishouden;

		this.aantalLaterHuisvesten =
			this.woningZoekendeHuishoudens - this.aantalDirectHuisvesten;

		this.laterTeHuisvestenJaren =
			this.aantalLaterHuisvesten / this.nieuwewoonsnelheid;
	}

	public update(
		leegstandPerProvincie: Record<string, number>,
		woningZoekendeHuishoudens: number,
		nieuwewoonsnelheid: number,
		woonOppervlaktePerHuishouden: number = 2.1 * 53
	) {
		this.leegstandPerProvincie = leegstandPerProvincie;
		this.woningZoekendeHuishoudens = woningZoekendeHuishoudens;
		this.nieuwewoonsnelheid = nieuwewoonsnelheid;
		this.woonOppervlaktePerHuishouden = woonOppervlaktePerHuishouden;

		this.calculate();

		return this;
	}
}

export default function Home() {
	const [woonData, setWoonData] = useState<WoonData | null>(null);

	const partijen = [
		{
			name: "SP",
			url: "https://www.sp.nl/standpunten/wonen",
			svg_src: "./sp.svg",
		},
		{
			name: "GroenLinks/PVDA",
			url: "https://groenlinkspvda.nl/standpunten/meer-huizen-om-in-te-wonen/",
			svg_src: "./glpvda.svg",
		},
		{
			name: "BIJ1",
			url: "https://bij1.org/standpunten/",
			svg_src: "./bij1.svg",
		},
		{
			name: "Partij voor de Dieren",
			url: "https://www.partijvoordedieren.nl/onze-idealen/wonen/huizen-zijn-geen-handelswaar",
			svg_src: "./pvdd.svg",
		},
	];

	useEffect(() => {
		const leegstandData = {
			Friesland: 1_301_350,
			Groningen: 1_288_540,
			Drenthe: 907_630,
			Overijssel: 2_207_560,
			Flevoland: 640_780,
			Gelderland: 4_017_020,
			Utrecht: 2_517_120,
			"Noord-Holland": 6_163_130,
			"Zuid-Holland": 6_963_630,
			Zeeland: 896_230,
			"Noord-Brabant": 5_596_780,
			Limburg: 4_041_900,
		};

		const woningzoekendeHuishoudens = 434_000;
		const huidigeWoonbouwsnelheidPerJaar = 82_000;

		const newWoonData = new WoonData(
			leegstandData,
			woningzoekendeHuishoudens,
			huidigeWoonbouwsnelheidPerJaar
		);

		setWoonData(newWoonData);
	}, []);

	if (!woonData) return <div></div>;

	return (
		<>
			<div className="container">
				<div className="spacer"></div>
				<div className="content-wrapper">
					<h1 className="heading-primary">
						In Nederland, is er
						<br />
						<span className="highlight-red">
							{(woonData.totaleLeegstand / 1_000_000)
								.toPrecision(3)
								.toLocaleString()
								.replace(".", ",")}{" "}
							miljoen m² leegstand
						</span>
						.{" "}
						<span className="citation-link">
							<a
								href="https://dashboards.cbs.nl/v5/landelijke_monitor_leegstand/"
								target="_blank"
								rel="noopener noreferrer"
							>
								(CBS)
							</a>
						</span>
					</h1>

					<p className="text-medium bordered-text-red">
						Dit is leegstand dat langer dan een jaar niet in gebruik
						is.
					</p>

					<h1 className="heading-primary">
						Er zijn ook in Nederland
						<br />
						<span className="highlight-red">
							{(
								woonData.woningZoekendeHuishoudens / 1000
							).toLocaleString()}{" "}
							duizend woningzoekende huishoudens
						</span>
						.{" "}
						<span className="citation-link">
							<a
								href="https://www.volkshuisvestingnederland.nl/onderwerpen/berekening-woningbouwopgave#:~:text=Er%20zijn%20in%202025%20circa,opzichte%20van%20de%20totale%20voorraad."
								target="_blank"
								rel="noopener noreferrer"
							>
								<br />
								(Volkshuisvesting Nederland)
							</a>
						</span>
					</h1>

					<h1 className="heading-primary">
						Toch worden er maar{" "}
						<span className="highlight-red">
							82.000 nieuwe woningen
						</span>{" "}
						per jaar gecreëerd.{" "}
						<span className="citation-link">
							<a
								href="https://www.cbs.nl/nl-nl/nieuws/2025/05/82-duizend-woningen-erbij-in-2024-minder-dan-voorgaande-vijf-jaar"
								target="_blank"
								rel="noopener noreferrer"
							>
								(CBS)
							</a>
						</span>
					</h1>

					<p className="text-large font-black italic margin-left">
						Dat is niet genoeg, toch?
					</p>

					<p className="text-medium text-gray font-bold margin-left">
						Nou.
					</p>

					<h1 className="heading-primary">
						Als we alle leegstand gebruiken om woningzoekende
						huishoudens te huisvesten, dan kan dat gemiddeld per
						huishouden{" "}
						<span className="highlight-emerald">
							{woonData.gemiddeldeLeegstandPerHuishouden.toFixed(
								0
							)}
							m²
						</span>
						.
					</h1>

					<p className="text-large bordered-text-emerald">
						Dat kan binnen een jaar geregeld zijn.
					</p>

					<h1 className="heading-secondary">
						Zelfs met eisen gesteld over woningen komen we er. Met
						<br />
						<span
							className="highlight-emerald font-black"
							style={{ fontSize: "1.875rem" }}
						>
							2,1 personen per huishouden
						</span>{" "}
						<a
							href="https://www.cbs.nl/nl-nl/visualisaties/dashboard-bevolking/woonsituatie/huishoudens-nu"
							className="citation-link-emerald"
						>
							(CBS)
						</a>{" "}
						<br />
						en een gemiddelde woonoppervlakte van
						<br />
						<span
							className="highlight-emerald font-black"
							style={{ fontSize: "1.875rem" }}
						>
							53m² per persoon
						</span>{" "}
						<a
							href="https://www.cbs.nl/nl-nl/achtergrond/2018/22/woonoppervlakte-in-nederland#:~:text=Gemiddeld%20heeft%20een%20Nederlander%2053,persoon%20doorgaans%20kleiner%20dan%20daarbuiten."
							className="citation-link-emerald"
						>
							(CBS)
						</a>
						,<br />
						heeft momenteel de gemmidelde huishouden
						<br />
						<span
							className="highlight-emerald font-black"
							style={{ fontSize: "2.25rem" }}
						>
							{woonData.woonOppervlaktePerHuishouden
								.toFixed(1)
								.replace(".", ",")}
							m² per woning
						</span>
						.
					</h1>

					<h1 className="heading-primary">
						Als we willen dat elk nieuw woning{" "}
						{woonData.woonOppervlaktePerHuishouden
							.toFixed(1)
							.replace(".", ",")}{" "}
						m² heeft, dan zullen nog steeds
						<br />
						<span className="highlight-emerald">
							{(woonData.aantalDirectHuisvesten / 1000)
								.toFixed(0)
								.toLocaleString()}{" "}
							duizend huishoudens
						</span>
						<br />
						direct gehuisvest kunnen worden met de leegstand.
					</h1>

					<h1 className="heading-primary">
						De overige
						<br />
						<span className="highlight-emerald">
							{(woonData.aantalLaterHuisvesten / 1000)
								.toFixed(0)
								.toLocaleString()}{" "}
							duizend huishoudens
						</span>
						<br />
						zullen dan nog steeds <br />
						in slechts{" "}
						<span className="highlight-emerald">
							{woonData.laterTeHuisvestenJaren.toFixed(1)} jaar
						</span>{" "}
						gehuisvest worden met de huidige snelheid nieuwe
						woningen.
					</h1>

					<h1 className="heading-primary">
						Maak wonen een{" "}
						<span className="highlight-red">recht</span>.
					</h1>

					<p
						className="text-medium font-bold margin-left"
						style={{ color: "#fff" }}
					>
						De grote huisjesmelkers die speculeren op woningen om
						alleen maar geld te verdienen moeten{" "}
						<span className="highlight-red italic">
							gestopt worden
						</span>
						.
					</p>

					<p className="call-to-action-box">
						Geef je om wonen in Nederland? Stem dan op partijen die
						dit{" "}
						<span
							style={{
								fontStyle: "italic",
								textDecoration: "underline",
							}}
						>
							echt
						</span>{" "}
						ondersteunen.
					</p>
				</div>
				<div className="party-logos">
					{partijen.map((partij) => (
						<a
							key={partij.name}
							href={partij.url}
							target="_blank"
							rel="noopener noreferrer"
							className="party-link"
						>
							{partij.svg_src && (
								<img
									src={partij.svg_src}
									alt={partij.name}
									className="party-logo"
								/>
							)}
							{!partij.svg_src && (
								<span className="party-name">
									{partij.name}
								</span>
							)}
						</a>
					))}
				</div>
			</div>
		</>
	);
}
