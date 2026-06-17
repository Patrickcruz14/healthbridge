from sentence_transformers import SentenceTransformer
from app.database.mongodb import db

model = SentenceTransformer("all-MiniLM-L6-v2")

knowledge_base = {
    "dengue": [
        {
            "tag": "basic_info",
            "content": "Ang dengue ay dulot ng dengue virus, ipinagkalat ng lamok na Aedes aegypti. Hindi nakakahawa sa tao-tao — sa lamok lang. May 4 serotypes: DENV-1, DENV-2, DENV-3, DENV-4. Pilipinas ay nasa top 8 dengue-endemic countries ayon sa WHO 2023. Peak season ay tag-ulan, Hunyo hanggang Nobyembre. Keywords: dengue virus mosquito aedes transmission spread cause."
        },
        {
            "tag": "stages",
            "content": "Stages ng dengue: Febrile phase Day 1-3 — mataas na lagnat 38.5 hanggang 40 degrees Celsius, sakit ng ulo, sakit sa likod ng mata, sakit ng kasukasuan. Critical phase Day 4-6 — bumababa ang lagnat PERO mapanganib, platelet count bumabagsak. Recovery phase Day 7 pataas — unti-unting gumaling ang pasyente. Keywords: dengue stages phases febrile critical recovery platelet."
        },
        {
            "tag": "sintomas",
            "content": "Sintomas ng dengue: biglaang mataas na lagnat 38.5 degrees pataas, matinding sakit ng kasukasuan at muscles na tinatawag na breakbone fever, sakit sa likod ng mata, pantal sa katawan na lumalabas sa Day 3 hanggang 5, pagdudugo sa ilong at gilagid, pagkawala ng gana kumain, at pagsusuka. Keywords: dengue symptoms fever rash pain joints eyes bleeding vomiting."
        },
        {
            "tag": "warning_signs",
            "content": "Warning signs ng dengue na kailangan pumunta agad sa ER: matinding sakit ng tiyan, paulit-ulit na pagsusuka ng 3 beses o higit, may dugo sa suka o dumi, biglaang pagbaba ng temperatura with panginginig, pagkalito o hindi na makatulog, sobrang panghihina, nanlalabi ang labi o kuko. Keywords: dengue warning signs emergency danger severe bleeding vomiting confusion weakness."
        },
        {
            "tag": "gamot_treatment",
            "content": "Gamot at treatment para sa dengue: Paracetamol 500mg tuwing 4-6 oras maximum 4 beses per araw ang tamang gamot. Bawal na gamot sa dengue: Aspirin, Ibuprofen, at Mefenamic acid dahil nagpapalala ng pagdudugo at platelet count. Walang specific na antiviral para sa dengue ayon sa WHO 2023. IV fluids sa ospital kung severe. Huwag uminom ng Aspirin o Ibuprofen. Keywords: dengue medicine medication treatment paracetamol aspirin ibuprofen mefenamic avoid prohibited drug."
        },
        {
            "tag": "hydration",
            "content": "Hydration para sa dengue: uminom ng 8-10 baso ng tubig per araw ayon sa DOH. Pwede ring ORS na 1 sachet sa 1 litro ng tubig. Ang coconut water ay may natural electrolytes na makakatulong. Iwasan ang softdrinks, energy drinks, at alak habang may dengue. Keywords: dengue hydration water fluid drink ORS coconut electrolytes."
        },
        {
            "tag": "prevention",
            "content": "Prevention ng dengue gamit ang 4S Strategy ng DOH: Search and destroy breeding sites ng lamok, Self-protection gamit ang mahabang damit at DEET repellent, Seek early consultation kapag may sintomas, Say no to indiscriminate fogging. Alisin ang nakatambak na tubig sa paligid ng bahay. Keywords: dengue prevention avoid protect mosquito repellent fogging breeding sites standing water."
        },
        {
            "tag": "libre_serbisyo",
            "content": "Libre na serbisyo para sa dengue: ang dengue consultation at blood test ay libre sa lahat ng government hospitals. Ang PhilHealth ay sumasaklaw sa dengue hospitalization. Para sa tulong tumawag sa DOH Hotline 1555. Keywords: dengue free service hospital philhealth government consultation blood test hotline."
        }
    ],
    "tb": [
        {
            "tag": "basic_info",
            "content": "Ang TB o Tuberculosis ay dulot ng bacteria na Mycobacterium tuberculosis. Nakakahawa sa hangin sa pamamagitan ng droplets kapag umubo, bumuga, o kumanta ang may sakit. HINDI nakakahawa sa paghawak ng kamay, pagkain, toilet seats, o damit. Pilipinas ay number 4 sa mundo sa TB burden ayon sa WHO 2023. May 800,000 bagong kaso bawat taon. Ang TB ay MAGAGAMOT na may 95 percent cure rate. Keywords: tuberculosis TB bacteria airborne contagious spread cause transmission curable."
        },
        {
            "tag": "sintomas",
            "content": "Sintomas ng TB: ubo na tumatagal ng 2 linggo o higit na siyang pinaka-classic sign, may dugo sa plema na tinatawag na hemoptysis, labis na pagpapawis sa gabi o night sweats, biglaang pagbaba ng timbang nang walang dahilan, mababang lagnat na paulit-ulit lalo na sa hapon, matinding pagod kahit hindi nag-eehersisyo. Keywords: TB symptoms cough blood sputum night sweats weight loss fatigue fever."
        },
        {
            "tag": "treatment_dots",
            "content": "Treatment ng TB gamit ang DOTS Program: 6 buwan ang standard treatment ayon sa DOH at WHO. Intensive phase: 2 buwan gamit ang 4 antibiotics na HRZE — Isoniazid, Rifampicin, Pyrazinamide, Ethambutol. Continuation phase: 4 buwan gamit ang 2 antibiotics na HR. KRITIKAL na huwag huminto kahit okay na ang pakiramdam dahil nagdudulot ito ng MDR-TB. Keywords: TB treatment DOTS program antibiotics isoniazid rifampicin pyrazinamide ethambutol months complete."
        },
        {
            "tag": "side_effects",
            "content": "Side effects ng TB gamot: Isoniazid ay nagdudulot ng pamamanhid ng kamay at paa. Rifampicin ay nagpapula ng ihi at luha na NORMAL lang ito. Pyrazinamide ay nagdudulot ng sakit ng kasukasuan. Ethambutol ay maaaring magdulot ng problema sa paningin kaya ipaalam agad sa doktor. Keywords: TB medicine side effects isoniazid rifampicin orange urine numbness joint pain vision."
        },
        {
            "tag": "mdr_tb",
            "content": "Ang MDR-TB o Multi-drug resistant TB ay nangyayari kapag huminto sa gamot bago matapos ang 6 buwan. Mas mahirap gamutin ang MDR-TB at mas matagal — 18 hanggang 24 buwan ang treatment. Mahal din ang gamot kaya mahalaga na kumpletuhin ang orihinal na treatment. Keywords: MDR-TB drug resistant tuberculosis incomplete treatment longer expensive difficult."
        },
        {
            "tag": "libre_serbisyo",
            "content": "Libre na serbisyo para sa TB: lahat ng TB medicines ay LIBRE sa lahat ng DOTS centers sa Pilipinas. Ang sputum microscopy at Xpert MTB slash RIF test ay LIBRE rin. Para sa tulong tumawag sa DOH Hotline 1555. Hanapin ang pinakamalapit na DOTS center sa barangay health center o government hospital. Keywords: TB free medicine DOTS center sputum test xpert government hospital hotline."
        },
        {
            "tag": "stigma",
            "content": "Ang TB ay hindi dapat ikahiya. Ito ay sakit na dulot ng bacteria at hindi dahil sa karumihan o kasalanan. Ang sinumang tao ay maaaring magkaroon ng TB. Ang TB ay NAGAGAMOT at ang pasyente na kumukumpleto ng treatment ay gagaling. Huwag itago ang sakit — humingi ng tulong agad. Keywords: TB stigma shame curable treatable anyone bacteria not dirty not sin seek help."
        }
    ],
    "hypertension": [
        {
            "tag": "basic_info",
            "content": "Ang hypertension o mataas na blood pressure ay persistently 130 over 80 mmHg o higit. Tinatawag itong silent killer dahil karamisan ay walang sintomas hanggang sa may komplikasyon na. Isa sa 4 na adult Filipinos ay may hypertension ayon sa DOH 2023. Ito ang leading cause ng stroke at heart attack sa Pilipinas. Kontrolable ang hypertension sa pamamagitan ng lifestyle changes at gamot. Keywords: hypertension high blood pressure silent killer stroke heart attack cause Philippines."
        },
        {
            "tag": "bp_classification",
            "content": "BP Classification: Normal ay wala pang 120 over 80 mmHg. Elevated ay 120-129 over wala pang 80 mmHg. Stage 1 Hypertension ay 130-139 over 80-89 mmHg. Stage 2 Hypertension ay 140 over 90 mmHg o higit. Hypertensive Crisis ay 180 over 120 mmHg o higit na kailangan ng emergency treatment agad. Keywords: blood pressure classification normal elevated stage 1 stage 2 hypertensive crisis mmHg reading levels."
        },
        {
            "tag": "sintomas",
            "content": "Sintomas ng hypertension: matinding sakit ng ulo lalo na sa umaga, pagkahilo o pagkawala ng balanse, malabong paningin, palpitations o mabilis na tibok ng puso, dumudugo ang ilong, at vertigo. Maraming may hypertension ay walang sintomas kaya mahalaga ang regular na BP monitoring. Keywords: hypertension symptoms headache dizziness blurred vision palpitations nosebleed vertigo signs."
        },
        {
            "tag": "komplikasyon",
            "content": "Komplikasyon ng hindi ginagamot na hypertension: stroke o atake sa utak, heart attack o atake sa puso, kidney failure o pagpalya ng bato, at heart failure. Ang mga komplikasyong ito ay mapipigilan kung kontrolado ang blood pressure sa pamamagitan ng tamang gamot at lifestyle changes. Keywords: hypertension complications stroke heart attack kidney failure heart failure untreated dangerous."
        },
        {
            "tag": "lifestyle_changes",
            "content": "Lifestyle changes para kontrolin ang hypertension gamit ang DASH Diet: kumain ng maraming prutas at gulay, bawasan ang asin sa wala pang 2300mg sodium per araw, iwasan ang processed foods, instant noodles, bagoong, at patis. Mag-exercise ng 150 minutes moderate activity per linggo. Iwasan ang alak at sigarilyo. Keywords: hypertension lifestyle DASH diet exercise sodium salt reduce fruits vegetables alcohol smoking."
        },
        {
            "tag": "gamot",
            "content": "Gamot para sa hypertension: ACE inhibitors, ARBs, Calcium channel blockers, Beta blockers, at Diuretics. HUWAG huminto sa maintenance medication kahit okay na ang BP dahil babalik ang hypertension. Kumonsulta sa doktor para sa tamang gamot at dosis. Huwag mag-self medicate. Keywords: hypertension medicine medication ACE inhibitors ARB calcium channel blocker beta blocker diuretic maintenance."
        },
        {
            "tag": "libre_serbisyo",
            "content": "Libre na serbisyo para sa hypertension: ang BP monitoring ay libre sa lahat ng barangay health centers sa Pilipinas. Kumonsulta sa pinakamalapit na health center para sa regular na check-up. Para sa tulong tumawag sa DOH Hotline 1555. Keywords: hypertension free BP monitoring barangay health center government checkup hotline."
        }
    ]
}

def populate():
    for disease, chunks in knowledge_base.items():
        collection_name = f"{disease}_vectors"
        collection = db[collection_name]
        collection.drop()
        print(f"Dropped existing {collection_name}")

        docs = []
        for chunk in chunks:
            embedding = model.encode(chunk["content"]).tolist()
            docs.append({
                "tag": chunk["tag"],
                "content": chunk["content"],
                "embedding": embedding
            })

        collection.insert_many(docs)
        print(f"✅ {collection_name} — {len(docs)} chunks inserted")

    print("\n🎉 Done! Vector collections populated.")

if __name__ == "__main__":
    populate()