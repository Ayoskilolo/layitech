<script setup lang="ts">
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { title } from "radash";

//Display Helper for changing page
const formStage = ref(0);
const loading = ref(false);
const dialog = ref(false);
const formSubmissionStatus = ref("PENDING");

//Options for Select Button On Form
const nigerianStates = [
  { name: "Abia", inactive: true },
  { name: "Adamawa", inactive: true },
  { name: "Akwa Ibom", inactive: true },
  { name: "Anambra", inactive: true },
  { name: "Bauchi", inactive: true },
  { name: "Bayelsa", inactive: true },
  { name: "Benue", inactive: true },
  { name: "Borno", inactive: true },
  { name: "Cross River", inactive: true },
  { name: "Delta", inactive: true },
  { name: "Ebonyi", inactive: true },
  { name: "Edo", inactive: true },
  { name: "Ekiti", inactive: true },
  { name: "Enugu", inactive: true },
  { name: "FCT - Abuja", inactive: true },
  { name: "Gombe", inactive: true },
  { name: "Imo", inactive: true },
  { name: "Jigawa", inactive: true },
  { name: "Kaduna", inactive: true },
  { name: "Kano", inactive: true },
  { name: "Katsina", inactive: true },
  { name: "Kebbi", inactive: true },
  { name: "Kogi", inactive: true },
  { name: "Kwara", inactive: true },
  { name: "Lagos" },
  { name: "Nasarawa", inactive: true },
  { name: "Niger", inactive: true },
  { name: "Ogun", inactive: true },
  { name: "Ondo", inactive: true },
  { name: "Osun", inactive: true },
  { name: "Oyo", inactive: true },
  { name: "Plateau", inactive: true },
  { name: "Rivers", inactive: true },
  { name: "Sokoto", inactive: true },
  { name: "Taraba", inactive: true },
  { name: "Yobe", inactive: true },
  { name: "Zamfara", inactive: true },
];

const nigerianBanks = [
  {
    label: "3Line",
    value: "110005",
  },
  {
    label: "Ab MFB",
    value: "090270",
  },
  {
    label: "Abbey Mortgage Bank",
    value: "070010",
  },
  {
    label: "Above Only MFB",
    value: "090260",
  },
  {
    label: "Abu MFB",
    value: "090197",
  },
  {
    bank_short_name: "access",
    cbn_code: "044",
    disabled_for_vnuban: 1,
    label: "Access Bank Nigeria",
    value: "000014",
  },
  {
    label: "Access Yello and Beta",
    value: "100052",
  },
  {
    bank_short_name: "access-mobile",
    cbn_code: "323",
    disabled_for_vnuban: null,
    label: "Accessmoney",
    value: "100013",
  },
  {
    label: "Accion MFB",
    value: "090134",
  },
  {
    label: "Addosser MFB",
    value: "090160",
  },
  {
    label: "Adeyemi College Staff MFB",
    value: "090268",
  },
  {
    label: "Afekhafe MFB",
    value: "090292",
  },
  {
    label: "Ag Mortgage Bank",
    value: "100028",
  },
  {
    label: "Al-Barkah MFB",
    value: "090133",
  },
  {
    label: "Al-Hayat MFB",
    value: "090277",
  },
  {
    label: "Alekun MFB",
    value: "090259",
  },
  {
    label: "Alert MFB",
    value: "090297",
  },
  {
    label: "Allworkers MFB",
    value: "090131",
  },
  {
    label: "Alpha Kapital MFB",
    value: "090169",
  },
  {
    label: "Amju Unique MFB",
    value: "090180",
  },
  {
    label: "AMML MFB",
    value: "090116",
  },
  {
    label: "Apeks MFB",
    value: "090143",
  },
  {
    label: "Arise MFB",
    value: "090282",
  },
  {
    bank_short_name: "aso-savings",
    cbn_code: "401",
    disabled_for_vnuban: null,
    label: "Aso Savings And Loans",
    value: "090001",
  },
  {
    label: "Assetmatrix MFB",
    value: "090287",
  },
  {
    label: "Astrapolaris MFB",
    value: "090172",
  },
  {
    label: "Auchi MFB",
    value: "090264",
  },
  {
    label: "Baines Credit MFB",
    value: "090188",
  },
  {
    label: "Balogun Gambari MFB",
    value: "090326",
  },
  {
    label: "Baobab MFB",
    value: "090136",
  },
  {
    label: "BC Kash MFB",
    value: "090127",
  },
  {
    label: "Boctrust MFB",
    value: "090117",
  },
  {
    label: "Bosak MFB",
    value: "090176",
  },
  {
    label: "Bowen MFB",
    value: "090148",
  },
  {
    label: "Brent Mortgage Bank",
    value: "070015",
  },
  {
    label: "Brethren MFB",
    value: "090293",
  },
  {
    label: "Brightway MFB",
    value: "090308",
  },
  {
    label: "Cellulant",
    value: "100005",
  },
  {
    bank_short_name: "",
    cbn_code: "50823",
    disabled_for_vnuban: null,
    label: "CEMCS MFB",
    value: "090154",
  },
  {
    label: "Chikum MFB",
    value: "090141",
  },
  {
    label: "CIT MFB",
    value: "090144",
  },
  {
    bank_short_name: "citibankng",
    cbn_code: "023",
    disabled_for_vnuban: null,
    label: "Citibank Nigeria",
    value: "000009",
  },
  {
    label: "Consumer MFB",
    value: "090130",
  },
  {
    label: "Contec Global Infotech",
    value: "100032",
  },
  {
    bank_short_name: "cmfb",
    cbn_code: "902",
    disabled_for_vnuban: null,
    label: "Coronation Merchant Bank",
    value: "060001",
  },
  {
    label: "Covenant",
    value: "070006",
  },
  {
    label: "Credit Afrique MFB",
    value: "090159",
  },
  {
    label: "Daylight MFB",
    value: "090167",
  },
  {
    label: "E-Barcs MFB",
    value: "090156",
  },
  {
    label: "Eagle Flight MFB",
    value: "090294",
  },
  {
    label: "Eartholeum (Qik Qik)",
    value: "100021",
  },
  {
    bank_short_name: "ecobank",
    cbn_code: "050",
    disabled_for_vnuban: null,
    label: "Ecobank Bank",
    value: "000010",
  },
  {
    bank_short_name: "ecobank-mobile",
    cbn_code: "307",
    disabled_for_vnuban: null,
    label: "Ecobank Xpress",
    value: "100008",
  },
  {
    label: "EdFin MFB",
    value: "090310",
  },
  {
    bank_short_name: "",
    cbn_code: "562",
    disabled_for_vnuban: null,
    label: "Ekondo MFB",
    value: "090097",
  },
  {
    label: "Emeralds MFB",
    value: "090273",
  },
  {
    label: "Empire Trust MFB",
    value: "090114",
  },
  {
    label: "Esan MFB",
    value: "090189",
  },
  {
    label: "Eso-E MFB",
    value: "090166",
  },
  {
    label: "Etranzact",
    value: "100006",
  },
  {
    label: "Evangel MFB",
    value: "090304",
  },
  {
    label: "Fast MFB",
    value: "090179",
  },
  {
    bank_short_name: "",
    cbn_code: "911",
    disabled_for_vnuban: null,
    label: "FBNQuest Merchant Bank",
    value: "060002",
  },
  {
    label: "FCMB Easy Account",
    value: "100031",
  },
  {
    label: "FCT MFB",
    value: "090290",
  },
  {
    label: "Federal University Dutse MFB",
    value: "090318",
  },
  {
    label: "Fedpoly Nasarawa MFB",
    value: "090298",
  },
  {
    label: "FETS (My Wallet)",
    value: "100001",
  },
  {
    label: "FFS Microfinance",
    value: "090153",
  },
  {
    bank_short_name: "fidelity",
    cbn_code: "070",
    disabled_for_vnuban: null,
    label: "Fidelity Bank",
    value: "000007",
  },
  {
    label: "Fidelity Mobile",
    value: "100019",
  },
  {
    label: "Fidfund MFB",
    value: "090126",
  },
  {
    label: "Finatrust MFB",
    value: "090111",
  },
  {
    label: "First Apple",
    value: "110004",
  },
  {
    bank_short_name: "firstbank",
    cbn_code: "011",
    disabled_for_vnuban: null,
    label: "First Bank of Nigeria",
    value: "000016",
  },
  {
    bank_short_name: "fcmb",
    cbn_code: "214",
    disabled_for_vnuban: null,
    label: "First City Monument Bank",
    value: "000003",
  },
  {
    label: "First Gen Mortgage Bank",
    value: "070014",
  },
  {
    label: "First Multiple MFB",
    value: "090163",
  },
  {
    label: "First Option MFB",
    value: "090285",
  },
  {
    label: "First Royal MFB",
    value: "090164",
  },
  {
    label: "First Trust Mortgage Bank",
    value: "090005",
  },
  {
    label: "First Trust Mortgage Bank",
    value: "090107",
  },
  {
    label: "Firstmonie Wallet",
    value: "100014",
  },
  {
    label: "Flutterwave Tech Solutions",
    value: "110002",
  },
  {
    label: "Fortis MFB",
    value: "070002",
  },
  {
    label: "Fortis Mobile",
    value: "100016",
  },
  {
    bank_short_name: "fsdh",
    cbn_code: "501",
    disabled_for_vnuban: null,
    label: "FSDH Merchant Bank",
    value: "400001",
  },
  {
    label: "Full Range MFB",
    value: "090145",
  },
  {
    label: "Futo MFB",
    value: "090158",
  },
  {
    label: "Gashua MFB",
    value: "090168",
  },
  {
    label: "Gateway Mortgage Bank",
    value: "070009",
  },
  {
    bank_short_name: "",
    cbn_code: "103",
    disabled_for_vnuban: null,
    label: "Globus Bank",
    value: "000027",
  },
  {
    label: "Glory MFB",
    value: "090278",
  },
  {
    bank_short_name: "sterling",
    cbn_code: null,
    disabled_for_vnuban: null,
    label: "Gomoney",
    value: "100022",
  },
  {
    label: "Gowans MFB",
    value: "090122",
  },
  {
    label: "Greenbank MFB",
    value: "090178",
  },
  {
    label: "Greenville MFB",
    value: "090269",
  },
  {
    label: "Grooming MFB",
    value: "090195",
  },
  {
    bank_short_name: "gtb-mobile",
    cbn_code: "315",
    disabled_for_vnuban: null,
    label: "GT Mobile Money",
    value: "100009",
  },
  {
    bank_short_name: "gtb",
    cbn_code: "058",
    disabled_for_vnuban: null,
    label: "Guaranty Trust Bank",
    value: "000013",
  },
  {
    label: "Hackman MFB",
    value: "090147",
  },
  {
    label: "Haggai Mortgage Bank",
    value: "070017",
  },
  {
    label: "Hala MFB",
    value: "090291",
  },
  {
    bank_short_name: "",
    cbn_code: "50383",
    disabled_for_vnuban: null,
    label: "Hasal MFB",
    value: "090121",
  },
  {
    label: "Hedonmark",
    value: "100017",
  },
  {
    bank_short_name: "heritage",
    cbn_code: "030",
    disabled_for_vnuban: null,
    label: "Heritage Bank",
    value: "000020",
  },
  {
    label: "Ibile MFB",
    value: "090118",
  },
  {
    label: "Ikire MFB",
    value: "090275",
  },
  {
    label: "Ikire MFB",
    value: "090279",
  },
  {
    label: "Imo State MFB",
    value: "090258",
  },
  {
    label: "Imperial Homes Mortgage Bank",
    value: "100024",
  },
  {
    label: "Infinity MFB",
    value: "090157",
  },
  {
    label: "Infinity Trust Mortgage Bank",
    value: "070016",
  },
  {
    label: "Innovectives Kesh",
    value: "100029",
  },
  {
    label: "Interswitch",
    value: "110003",
  },
  {
    label: "IRL MFB",
    value: "090149",
  },
  {
    label: "Itex Integrated Services",
    value: "090211",
  },
  {
    bank_short_name: "jaiz",
    cbn_code: "301",
    disabled_for_vnuban: null,
    label: "Jaiz Bank",
    value: "000006",
  },
  {
    label: "Jubilee Life",
    value: "090003",
  },
  {
    label: "Kadpoly MFB",
    value: "090320",
  },
  {
    label: "KCMB MFB",
    value: "090191",
  },
  {
    label: "Kegow",
    value: "100015",
  },
  {
    bank_short_name: "keystone",
    cbn_code: "082",
    disabled_for_vnuban: null,
    label: "Keystone Bank",
    value: "000002",
  },
  {
    label: "Kontagora MFB",
    value: "090299",
  },
  {
    bank_short_name: "",
    cbn_code: "50200",
    disabled_for_vnuban: null,
    label: "Kredi Bank",
    value: "090380",
  },
  {
    bank_short_name: "",
    cbn_code: "50211",
    disabled_for_vnuban: null,
    label: "Kuda MFB",
    value: "090267",
  },
  {
    label: "La Fayette MFB",
    value: "090155",
  },
  {
    label: "Lagos Building Investment Company",
    value: "070012",
  },
  {
    label: "LAPO MFB",
    value: "090177",
  },
  {
    label: "Lavender MFB",
    value: "090271",
  },
  {
    label: "Lovonus MFB",
    value: "090265",
  },
  {
    label: "M-Kudi",
    value: "100011",
  },
  {
    label: "Mainstreet MFB",
    value: "090171",
  },
  {
    label: "Malachy MFB",
    value: "090174",
  },
  {
    label: "Megapraise MFB",
    value: "090280",
  },
  {
    label: "Microvis MFB",
    value: "090113",
  },
  {
    label: "Midland MFB",
    value: "090192",
  },
  {
    label: "Mimoney Intellifin Solutions",
    value: "100027",
  },
  {
    label: "Mint-Finex MFB",
    value: "090281",
  },
  {
    label: "Money Trust MFB",
    value: "090129",
  },
  {
    label: "Moneybox",
    value: "100020",
  },
  {
    label: "Mutual Benefits Mifb",
    value: "090190",
  },
  {
    label: "Mutual Trust MFB",
    value: "090151",
  },
  {
    bank_short_name: "n/a",
    cbn_code: "",
    disabled_for_vnuban: null,
    label: "N/A",
    value: "010101",
  },
  {
    label: "Nargata MFB",
    value: "090152",
  },
  {
    label: "Ndiorah MFB",
    value: "090128",
  },
  {
    label: "New Dawn MFB",
    value: "090205",
  },
  {
    label: "New Prudential Bank",
    value: "090108",
  },
  {
    bank_short_name: "nibbs",
    cbn_code: "000000",
    disabled_for_vnuban: null,
    label: "NIBBS",
    value: "000000",
  },
  {
    label: "Nigerian Navy MFB",
    value: "090263",
  },
  {
    label: "Nigerian Police Force MFB",
    value: "070001",
  },
  {
    label: "Nirsal MFB",
    value: "090194",
  },
  {
    label: "Nnew Women MFB",
    value: "090283",
  },
  {
    bank_short_name: "",
    cbn_code: "561",
    disabled_for_vnuban: null,
    label: "Nova Merchant Bank",
    value: "060003",
  },
  {
    label: "Ohafia MFB",
    value: "090119",
  },
  {
    label: "Okpoga MFB",
    value: "090161",
  },
  {
    label: "Olabisi Onabanjo University MFB",
    value: "090272",
  },
  {
    label: "Omiye MFB",
    value: "090295",
  },
  {
    label: "Omoluabi Mortgage Bank",
    value: "070007",
  },
  {
    bank_short_name: "",
    cbn_code: "565",
    disabled_for_vnuban: null,
    label: "One Finance",
    value: "100026",
  },
  {
    label: "Paga",
    value: "100002",
  },
  {
    label: "Page Financials",
    value: "070008",
  },
  {
    label: "Palmpay",
    value: "100033",
  },
  {
    bank_short_name: "parallex",
    cbn_code: "526",
    disabled_for_vnuban: null,
    label: "Parallex MFB",
    value: "090004",
  },
  {
    bank_short_name: "parkway",
    cbn_code: "311",
    disabled_for_vnuban: null,
    label: "Parkway-Readycash",
    value: "100003",
  },
  {
    label: "Patrickgold MFB",
    value: "090317",
  },
  {
    label: "Payattitude Online",
    value: "110001",
  },
  {
    bank_short_name: "paycom",
    cbn_code: "999992",
    disabled_for_vnuban: null,
    label: "Paycom (Opay)",
    value: "100004",
  },
  {
    label: "Paystack Payments",
    value: "110006",
  },
  {
    label: "Pecantrust MFB",
    value: "090137",
  },
  {
    label: "Pennywise MFB",
    value: "090196",
  },
  {
    label: "Personal Trust MFB",
    value: "090135",
  },
  {
    label: "Petra MFB",
    value: "090165",
  },
  {
    label: "Pillar MFB",
    value: "090289",
  },
  {
    label: "Platinum Mortgage Bank",
    value: "070013",
  },
  {
    bank_short_name: "PBL",
    cbn_code: "076",
    disabled_for_vnuban: null,
    label: "Polaris Bank",
    value: "000008",
  },
  {
    label: "Polyuwana MFB",
    value: "090296",
  },
  {
    label: "Prestige MFB",
    value: "090274",
  },
  {
    bank_short_name: "providus",
    cbn_code: "101",
    disabled_for_vnuban: null,
    label: "Providus Bank",
    value: "000023",
  },
  {
    label: "Purplemoney MFB",
    value: "090303",
  },
  {
    label: "Quickfund MFB",
    value: "090261",
  },
  {
    label: "Rahama MFB",
    value: "090170",
  },
  {
    bank_short_name: "",
    cbn_code: "502",
    disabled_for_vnuban: null,
    label: "Rand Merchant Bank",
    value: "000024",
  },
  {
    label: "Refuge Mortgage Bank",
    value: "070011",
  },
  {
    label: "Regent MFB",
    value: "090125",
  },
  {
    label: "Reliance MFB",
    value: "090173",
  },
  {
    label: "Renmoney MFB",
    value: "090198",
  },
  {
    label: "Richway MFB",
    value: "090132",
  },
  {
    bank_short_name: null,
    cbn_code: "50515",
    disabled_for_vnuban: null,
    label: "Rolez Bank",
    value: "090405",
  },
  {
    label: "Royal Exchange MFB",
    value: "090138",
  },
  {
    bank_short_name: "RMB",
    cbn_code: "125",
    disabled_for_vnuban: null,
    label: "Rubies MFB",
    value: "090175",
  },
  {
    label: "Safe Haven MFB",
    value: "090286",
  },
  {
    label: "Safetrust Mortgage Bank",
    value: "090006",
  },
  {
    label: "Sagamu MFB",
    value: "090140",
  },
  {
    label: "Seed Capital MFB",
    value: "090112",
  },
  {
    bank_short_name: "SPKL",
    cbn_code: "51310",
    disabled_for_vnuban: null,
    label: "Sparkle Bank",
    value: "090325",
  },
  {
    bank_short_name: "stanbic",
    cbn_code: "221",
    disabled_for_vnuban: null,
    label: "Stanbic IBTC",
    value: "000012",
  },
  {
    bank_short_name: "stanbic-mobile",
    cbn_code: "304",
    disabled_for_vnuban: null,
    label: "Stanbic IBTC @Ease Wal",
    value: "100007",
  },
  {
    bank_short_name: "standard-chartered",
    cbn_code: "068",
    disabled_for_vnuban: null,
    label: "Standard Chartered Bank",
    value: "000021",
  },
  {
    label: "Stanford MFB",
    value: "090162",
  },
  {
    label: "Stellas MFB",
    value: "090262",
  },
  {
    bank_short_name: "",
    cbn_code: "232",
    disabled_for_vnuban: null,
    label: "Sterling Bank",
    value: "000001",
  },
  {
    label: "Sulspap MFB",
    value: "090305",
  },
  {
    bank_short_name: "",
    cbn_code: "100",
    disabled_for_vnuban: null,
    label: "Suntrust Bank",
    value: "000022",
  },
  {
    label: "Tagpay",
    value: "100023",
  },
  {
    bank_short_name: "",
    cbn_code: "302",
    disabled_for_vnuban: null,
    label: "Taj Bank",
    value: "000026",
  },
  {
    bank_short_name: "",
    cbn_code: "51211",
    disabled_for_vnuban: null,
    label: "TCF MFB",
    value: "090115",
  },
  {
    label: "TeamApt",
    value: "110007",
  },
  {
    label: "Teasy Mobile",
    value: "100010",
  },
  {
    bank_short_name: "",
    cbn_code: "102",
    disabled_for_vnuban: null,
    label: "Titan Trust Bank",
    value: "000025",
  },
  {
    label: "Trident MFB",
    value: "090146",
  },
  {
    label: "Trustbanc J6 MFB",
    value: "090123",
  },
  {
    label: "Trustfund MFB",
    value: "090276",
  },
  {
    label: "UNIBEN MFB",
    value: "090266",
  },
  {
    label: "UNICAL MFB",
    value: "090193",
  },
  {
    bank_short_name: "unionbank",
    cbn_code: "032",
    disabled_for_vnuban: null,
    label: "Union Bank of Nigeria",
    value: "000018",
  },
  {
    bank_short_name: "uba",
    cbn_code: "033",
    disabled_for_vnuban: null,
    label: "United Bank for Africa",
    value: "000004",
  },
  {
    bank_short_name: "unity",
    cbn_code: "215",
    disabled_for_vnuban: null,
    label: "Unity Bank",
    value: "000011",
  },
  {
    label: "Unn MFB",
    value: "090251",
  },
  {
    bank_short_name: "vfd",
    cbn_code: "566",
    disabled_for_vnuban: null,
    label: "VFD MFB",
    value: "090110",
  },
  {
    label: "Virtue MFB",
    value: "090150",
  },
  {
    label: "Visa MFB",
    value: "090139",
  },
  {
    label: "Vtnetwork",
    value: "100012",
  },
  {
    bank_short_name: "wema",
    cbn_code: "035",
    disabled_for_vnuban: null,
    label: "Wema Bank",
    value: "000017",
  },
  {
    label: "Wetland MFB",
    value: "090120",
  },
  {
    label: "Xslnce MFB",
    value: "090124",
  },
  {
    label: "Yes MFB",
    value: "090142",
  },
  {
    bank_short_name: "zenith",
    cbn_code: "057",
    disabled_for_vnuban: null,
    label: "Zenith Bank",
    value: "000015",
  },
  {
    bank_short_name: "zenith-mobile",
    cbn_code: "322",
    disabled_for_vnuban: null,
    label: "Zenith Mobile",
    value: "100018",
  },
  {
    label: "Zinternet",
    value: "100025",
  },
];

const meansOfIdentification = [
  "National Identication Number",
  "Voter's Card",
  "Driver's License",
  "International Passport",
];

//Reactive Object that holds the form information.
const customerKYCForm = ref({
  customerFirstName: "",
  customerLastName: "",
  customerGender: "",
  customerPhoneNumber: "",
  customerEmail: "",
  customerAddress: "",
  customerCountryOfResidence: "",
  customerStateOfResidence: "",
  customerLGAOfResidence: "",
  isContactAddressPointOfInstallation: "",
  customerTypeOfEmployment: "",
  isSelfEmployedRegistered: "",
  selfEmployedRegistrationNumber: "",
  selfEmployedYearsOfOperation: "",
  customerProofOfEmployment: "",
  customerImage: [],
  customerIDCard: "",
  customerIdCardNumber: "",
  customerBVN: "",
  customerBankName: "",
  customerBankStatement: [],
  utilityBill: [],
});

const { handleFileInput: handleCustomerImage, files: customerImageFiles } =
  useFileStorage();
const {
  handleFileInput: handleCustomerBankStatement,
  files: customerBankStatementFiles,
} = useFileStorage();
const { handleFileInput: handleUtilityBill, files: utilityBillFiles } =
  useFileStorage();

async function buildDocument() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          createHeading("Solar Provider On-boarding Information"),
          ...writeJSONIntoParagraph(customerKYCForm.value),
        ],
      },
    ],
  });

  const buffer = await Packer.toBase64String(doc);

  return buffer;
}

function createHeading(text: string): Paragraph {
  return new Paragraph({
    text: text,
    heading: "Heading1",
    thematicBreak: true,
  });
}
function writeJSONIntoParagraph(formData: Object): Paragraph[] {
  const eachEntry = Object.entries(formData);

  let children = [];

  for (const [key, value] of eachEntry) {
    if (
      key === "customerBankStatement" ||
      key === "utilityBill" ||
      key === "customerImage"
    ) {
      continue;
    }
    const newLine = new Paragraph({
      children: [new TextRun(`${title(key)}: ${title(String(value))}`)],
      heading: HeadingLevel.HEADING_1,
    });

    children.push(newLine);
  }

  return children;
}

async function sendEmail() {
  try {
    loading.value = true;
    dialog.value = true;
    const docBuffer = await buildDocument();

    const response = await $fetch("api/generate-doc", {
      method: "POST",
      body: {
        doc: docBuffer,
        typeOfForm: "CLIENT",
        files: [
          customerBankStatementFiles.value,
          utilityBillFiles.value,
          customerImageFiles.value,
        ],
      },
    });

    if (response) {
      loading.value = false;
      formSubmissionStatus.value = "SUCCESS";
    } else {
      loading.value = false;
      formSubmissionStatus.value = "FAILURE";
    }
  } catch (error) {
    loading.value = false;
    formSubmissionStatus.value = "FAILURE";
  } finally {
    setTimeout(() => (dialog.value = false), 1000);
  }
}
</script>

<template>
  <section class="h-[150vh] flex flex-col relative animate__fadeIn relative">
    <div
      class="section-top h-[45%] bg-technicians bg-no-repeat bg-cover bg-center flex items-center justify-center z-[0]"
    >
      <p class="text-white text-2xl sm:text-6xl font-bold">Customer KYC</p>
    </div>
    <div
      class="h-[100%] bg-[#004AAD] sm:bg-bluewave bg-no-repeat bg-cover z-[0]"
    ></div>

    <div class="test absolute w-[87%] sm:w-[60%] h-[75%] sm:h-[70%] top-[60%]">
      <div class="cards green"></div>
      <div class="cards m-3 bg-white z-[1] on-top p-4 pt-12 sm:p-9">
        <v-form class="sm:w-[100%] flex flex-col text-left">
          <p
            class="text-[#43ab43] text-xl sm:text-3xl font-black mb-3 sm:text-left"
          >
            Client Information
          </p>
          <p
            class="text-[#002b65] text-base sm:text-xl font-light mb-3 sm:text-left"
          >
            To finance your solar installation, we need you to provide your
            personal and financial information.
          </p>

          <div v-if="!formStage">
            <p>1. Personal & Employment Details</p>
            <v-text-field
              v-model="customerKYCForm.customerFirstName"
              density="compact"
              placeholder="e.g John "
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="First Name"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="customerKYCForm.customerLastName"
              density="compact"
              placeholder="e.g Bosco"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Last Name"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-select
              v-model="customerKYCForm.customerGender"
              density="compact"
              :items="['Male', 'Female']"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Gender"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="customerKYCForm.customerPhoneNumber"
              density="compact"
              placeholder="0901 234 5678"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Phone Number"
              type="tel"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="customerKYCForm.customerEmail"
              density="compact"
              placeholder="john.bosco@email.com"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Email"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="customerKYCForm.customerAddress"
              density="compact"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Address"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-file-input
              density="compact"
              v-model="customerKYCForm.utilityBill"
              color="#002b65"
              base-color="black"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
              variant="outlined"
              label="Upload Utility Bill "
              type="file"
              @input="handleUtilityBill"
            />
            <v-select
              v-model="customerKYCForm.customerCountryOfResidence"
              density="compact"
              :items="['Nigeria']"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Country"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-select
              v-model="customerKYCForm.customerStateOfResidence"
              density="compact"
              :items="nigerianStates"
              item-title="name"
              item-value="name"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="State"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="customerKYCForm.customerLGAOfResidence"
              density="compact"
              placeholder="e.g John Bosco Ventures"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="LGA (Local Government Area)"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-radio-group
              v-model="customerKYCForm.isContactAddressPointOfInstallation"
              label="Is your contact address the same as where you want to install the system?"
            >
              <v-radio label="Yes, it is." value="Yes"></v-radio>
              <v-radio label="No, it isn't" value="No"></v-radio>
            </v-radio-group>

            <v-radio-group
              v-model="customerKYCForm.customerTypeOfEmployment"
              label="What type of employment are you currently on?"
            >
              <v-radio label="Self Employed" value="Self Employed"></v-radio>
              <v-radio label="Part Time" value="Part Time"></v-radio>
              <v-radio label="Full Time" value="Full Time"></v-radio>
              <v-radio label="Retired" value="Retired"></v-radio>
            </v-radio-group>

            <div
              v-if="
                customerKYCForm.customerTypeOfEmployment === 'Self Employed'
              "
            >
              <v-radio-group
                v-model="customerKYCForm.isSelfEmployedRegistered"
                label="Is your business registered or not registered?"
              >
                <v-radio
                  label="Yes"
                  value="Yes, my business is registered"
                ></v-radio>
                <v-radio
                  label="No"
                  value="No, my business is not registered"
                ></v-radio>
              </v-radio-group>

              <v-text-field
                v-if="
                  customerKYCForm.isSelfEmployedRegistered ===
                  'Yes, my business is registered'
                "
                v-model="customerKYCForm.selfEmployedRegistrationNumber"
                density="compact"
                placeholder="RC-12345678"
                color="#002b65"
                base-color="black"
                variant="outlined"
                label="⁠⁠Please provide, CAC Reg no."
                class="mb-3"
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
              />

              <v-text-field
                v-model="customerKYCForm.selfEmployedYearsOfOperation"
                density="compact"
                placeholder="e.g 2"
                color="#002b65"
                base-color="black"
                variant="outlined"
                label="Years of operation"
                class="mb-3"
                type="tel"
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
              />
            </div>

            <Transition>
              <div
                v-if="
                  customerKYCForm.customerTypeOfEmployment === 'Part Time' ||
                  customerKYCForm.customerTypeOfEmployment === 'Full Time'
                "
              >
                <v-text-field
                  density="compact"
                  v-model="customerKYCForm.customerProofOfEmployment"
                  color="#002b65"
                  base-color="black"
                  class="mb-3"
                  rounded
                  :rules="[(value) => !!value || 'This field is required.']"
                  variant="outlined"
                  label="Upload proof of employee contract/agreement."
                  type="file"
                />
              </div>
            </Transition>
            <div class="p-0 flex items-center justify-center">
              <v-btn
                color="#002B65"
                text="Next"
                max-width="30%"
                rounded="lg"
                append-icon="mdi-chevron-right"
                @click="formStage += 1"
              />
            </div>
          </div>
          <Transition>
            <div v-if="formStage">
              <p>2. Identity Confirmation & Credit Information</p>
              <p class="mb-10">
                Your identity information is required to verify your identity
              </p>

              <v-file-input
                density="compact"
                v-model="customerKYCForm.customerImage"
                color="#002b65"
                base-color="black"
                variant="outlined"
                class="mb-3"
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
                accept=".png,.jpeg"
                label="Add Photo (We will use your image to carry out a liveness check and also verify your identity)"
                @input="handleCustomerImage"
              />
              <v-select
                density="compact"
                v-model="customerKYCForm.customerIDCard"
                :items="meansOfIdentification"
                color="#002b65"
                base-color="black"
                variant="outlined"
                class="mb-3"
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
                label="Add your ID card (To verify your identity, please add your ID card number)"
              />
              <v-text-field
                density="compact"
                v-model="customerKYCForm.customerIdCardNumber"
                color="#002b65"
                base-color="black"
                variant="outlined"
                label="ID Card Number"
                class="mb-3"
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
              />

              <v-text-field
                density="compact"
                v-model="customerKYCForm.customerBVN"
                placeholder="Insert BVN here"
                color="#002b65"
                base-color="black"
                variant="outlined"
                label="BVN"
                type="tel"
                class="mb-4"
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
              />

              <v-select
                density="compact"
                v-model="customerKYCForm.customerBankName"
                placeholder="Union Bank"
                color="#002b65"
                base-color="black"
                class="mb-3"
                rounded
                :items="nigerianBanks"
                item-title="label"
                item-value="label"
                :rules="[(value) => !!value || 'This field is required.']"
                variant="outlined"
                label="Bank Name (Name of Bank the statement is submitted in)"
              />

              <v-file-input
                density="compact"
                v-model="customerKYCForm.customerBankStatement"
                color="#002b65"
                base-color="black"
                class="mb-3"
                multiple
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
                variant="outlined"
                label="6 months Bank Statements"
                accept=".png,.jpeg,.pdf"
                @input="handleCustomerBankStatement"
              />

              <div class="p-0 flex items-center justify-center gap-8">
                <v-btn
                  color="#002B65"
                  text="Previous"
                  max-width="40%"
                  prepend-icon="mdi-chevron-left"
                  rounded="lg"
                  @click="formStage -= 1"
                />
                <v-btn
                  color="#43AB43"
                  text="Submit"
                  max-width="30%"
                  rounded="lg"
                  @click="sendEmail()"
                />
              </div>
            </div>
          </Transition>
        </v-form>
      </div>
    </div>
  </section>

  <v-dialog v-model="dialog" max-width="320" persistent>
    <v-list class="py-2" color="primary" elevation="12" rounded="lg">
      <v-list-item
        prepend-icon="mdi-check"
        title="Successfully sent your form!"
        v-if="formSubmissionStatus === 'SUCCESS'"
      >
        <template v-slot:prepend>
          <div class="pe-4">
            <v-icon color="primary" size="x-large"></v-icon>
          </div>
        </template>
      </v-list-item>
      <v-list-item
        v-if="formSubmissionStatus === 'PENDING'"
        prepend-icon="$vuetify-outline"
        title="Sending your form..."
      >
        <template v-slot:prepend>
          <div class="pe-4">
            <v-icon color="primary" size="x-large"></v-icon>
          </div>
        </template>

        <template v-slot:append>
          <v-progress-circular
            color="primary"
            indeterminate="disable-shrink"
            size="16"
            width="2"
          ></v-progress-circular>
        </template>
      </v-list-item>
      <v-list-item
        v-if="formSubmissionStatus === 'FAILURE'"
        prepend-icon="mdi-message-alert"
        title="OOPS! Something went wrong. Please try again."
      >
        <template v-slot:prepend>
          <div class="pe-4">
            <v-icon color="primary" size="x-large"></v-icon>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<style scoped>
.main {
  border: 3px solid #002b65;
}

.section-top {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("/technicians.jpeg");
}

.card-container {
  position: relative;
}

.cards {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 26px;
  border: 2px solid #002b65;
  overflow: scroll;
}
.test {
  overflow-y: visible;
  overflow-x: visible;
  position: absolute;
  left: 52%;
  transform: translate(-50%, -50%);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
