"use client";
import { useEffect, useState } from "react";

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

		const woningzoekendeHuishoudens = 401_000;
		const huidigeWoonbouwsnelheidPerJaar = 82_000;

		const newWoonData = new WoonData(
			leegstandData,
			woningzoekendeHuishoudens,
			huidigeWoonbouwsnelheidPerJaar
		);

		setWoonData(newWoonData);
	}, []);

	if (!woonData) return <div>Loading...</div>;

	return (
		<div className="font-[var(--font-lexend-deca)] flex flex-col items-center min-h-screen bg-black p-8 text-center">
			<div style={{ height: "25vh" }}></div>
			<div className="flex flex-col justify-center min-h-screen space-y-64">
				<h1 className="text-5xl md:text-7xl font-black leading-tight text-white max-w-4xl uppercase tracking-tight">
					In Nederland, is er
					<br />
					<span className="text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
						{(woonData.totaleLeegstand / 1_000_000)
							.toPrecision(3)
							.toLocaleString()
							.replace(".", ",")}{" "}
						miljoen m² leegstand
					</span>
					.{" "}
					<span className="italic text-red-300 text-xl normal-case tracking-normal">
						<a
							href="https://dashboards.cbs.nl/v5/landelijke_monitor_leegstand/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-red-400 transition-colors duration-200"
						>
							(CBS)
						</a>
					</span>
				</h1>

				<p className="text-2xl md:text-3xl text-red-400 max-w-3xl font-bold border-l-4 border-red-500 pl-6 ml-15">
					Dit is leegstand dat langer dan een jaar niet bewoond is.
				</p>

				<h1 className="text-5xl md:text-7xl font-black leading-tight text-white max-w-4xl uppercase tracking-tight">
					Er zijn ook in Nederland
					<br />
					<span className="text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
						{(
							woonData.woningZoekendeHuishoudens / 1000
						).toLocaleString()}{" "}
						duizend woningzoekende huishoudens
					</span>
					.{" "}
					<span className="italic text-red-300 text-xl normal-case tracking-normal">
						<a
							href="https://www.cbs.nl/nl-nl/nieuws/2025/05/82-duizend-woningen-erbij-in-2024-minder-dan-voorgaande-vijf-jaar"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-red-400 transition-colors duration-200"
						>
							(CBS)
						</a>
					</span>
				</h1>

				<h1 className="text-5xl md:text-7xl font-black leading-tight text-white max-w-4xl uppercase tracking-tight">
					Toch worden er maar{" "}
					<span className="text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
						82.000 nieuwe woningen
					</span>{" "}
					per jaar gecreëerd.{" "}
					<span className="italic text-red-300 text-xl normal-case tracking-normal">
						<a
							href="https://www.cbs.nl/nl-nl/nieuws/2025/05/82-duizend-woningen-erbij-in-2024-minder-dan-voorgaande-vijf-jaar"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-red-400 transition-colors duration-200"
						>
							(CBS)
						</a>
					</span>
				</h1>

				<p className="text-3xl md:text-4xl text-white max-w-3xl font-black italic ml-15">
					Dat is niet genoeg, toch?
				</p>

				<p className="text-2xl md:text-3xl text-gray-400 max-w-3xl font-bold ml-15">
					Nou.
				</p>

				<h1 className="text-5xl md:text-7xl font-black leading-tight text-white max-w-4xl uppercase tracking-tight">
					Als we alle leegstand gebruiken om woningzoekende
					huishoudens te huisvesten, dan kan dat gemiddeld per
					huishouden{" "}
					<span className="text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]">
						{woonData.gemiddeldeLeegstandPerHuishouden.toFixed(0)}m²
					</span>
					.
				</h1>

				<p className="text-3xl md:text-4xl text-emerald-400 max-w-3xl font-black border-l-4 border-emerald-500 pl-6 ml-15">
					Dat kan binnen een jaar geregeld zijn.
				</p>

				<h1 className="text-2xl md:text-3xl text-white max-w-4xl leading-relaxed font-semibold">
					Zelfs met eisen gesteld over woningen komen we er. Met
					<br />
					<span className="text-emerald-400 font-black text-3xl">
						2,1 personen per huishouden
					</span>{" "}
					<a
						href="https://www.cbs.nl/nl-nl/visualisaties/dashboard-bevolking/woonsituatie/huishoudens-nu"
						className="underline hover:text-emerald-300 transition-colors duration-200 text-emerald-300"
					>
						(CBS)
					</a>{" "}
					<br />
					en een gemiddelde woonoppervlakte van
					<br />
					<span className="text-emerald-400 font-black text-3xl">
						53m² per persoon
					</span>{" "}
					<a
						href="https://www.cbs.nl/nl-nl/achtergrond/2018/22/woonoppervlakte-in-nederland#:~:text=Gemiddeld%20heeft%20een%20Nederlander%2053,persoon%20doorgaans%20kleiner%20dan%20daarbuiten."
						className="underline hover:text-emerald-300 transition-colors duration-200 text-emerald-300"
					>
						(CBS)
					</a>
					,<br />
					heeft momenteel de gemmidelde huishouden
					<br />
					<span className="text-emerald-400 font-black text-4xl">
						{woonData.woonOppervlaktePerHuishouden
							.toFixed(1)
							.replace(".", ",")}
						m² per woning
					</span>
					.
				</h1>

				<h1 className="text-5xl md:text-7xl font-black leading-tight text-white max-w-4xl uppercase tracking-tight">
					Als we willen dat elk nieuw woning{" "}
					{woonData.woonOppervlaktePerHuishouden
						.toFixed(1)
						.replace(".", ",")}{" "}
					m² heeft, dan zullen nog steeds
					<br />
					<span className="text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]">
						{(woonData.aantalDirectHuisvesten / 1000)
							.toFixed(0)
							.toLocaleString()}{" "}
						duizend huishoudens
					</span>
					<br />
					direct gehuisvest kunnen worden met de leegstand.
				</h1>

				<h1 className="text-5xl md:text-7xl font-black leading-tight text-white max-w-4xl uppercase tracking-tight">
					De overige
					<br />
					<span className="text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]">
						{(woonData.aantalLaterHuisvesten / 1000)
							.toFixed(0)
							.toLocaleString()}{" "}
						duizend huishoudens
					</span>
					<br />
					zullen dan nog steeds <br />
					in slechts{" "}
					<span className="text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]">
						{Math.ceil(woonData.laterTeHuisvestenJaren).toFixed(0)}{" "}
						jaar
					</span>{" "}
					gehuisvest worden met de huidige nieuwewoonsnelheid.
				</h1>

				<h1 className="text-5xl md:text-7xl font-black leading-tight text-white max-w-4xl uppercase tracking-tight">
					Maak wonen een{" "}
					<span className="text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
						recht
					</span>
					.
				</h1>

				<p className="text-2xl md:text-3xl text-white max-w-3xl font-bold ml-15">
					De grote huisjesmelkers die speculeren op woningen om alleen
					maar geld te verdienen moeten{" "}
					<span className="text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)] italic">
						gestopt worden
					</span>
					.
				</p>

				<p className="text-3xl md:text-4xl text-white max-w-3xl font-black border-4 border-red-500 p-8 bg-red-500/10 uppercase tracking-wide ml-15">
					Geef je om wonen in Nederland? Stem dan op partijen die dit
					echt ondersteunen.
				</p>
			</div>
			<div className="mt-10 bottom-8 flex flex-row justify-center w-full flex-wrap">
				{partijen.map((partij) => (
					<a
						key={partij.name}
						href={partij.url}
						target="_blank"
						rel="noopener noreferrer"
						className="flex flex-col items-center mx-4 text-white hover:text-emerald-300 transition-colors duration-200"
					>
						{partij.svg_src && (
							<img
								src={partij.svg_src}
								alt={partij.name}
								className="h-8 md:h-20 mb-2"
							/>
						)}
						{!partij.svg_src && (
							<span className="text-lg md:text-xl underline">
								{partij.name}
							</span>
						)}
					</a>
				))}
			</div>
		</div>
	);
}
