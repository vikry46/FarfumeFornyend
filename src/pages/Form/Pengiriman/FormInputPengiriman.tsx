import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Interface untuk data pengiriman
interface Pengiriman {
    id: number;
    id_market: number;
    id_supplie: number;
    jumlah_kirim: number;
    tanggal: string;
    market?: {
        id: number;
        nama: string;
    };
    supplie?: {
        id: number;
        nama: string;
    };
}

interface Market {
    id: number;
    nama: string;
    kode_cabang: string;
}

interface Supplie {
    id: number;
    nama: string;
    kode_barang: string;
}

interface FormInputPengirimanProps {
    onPengirimanAdded: (pengiriman: Pengiriman) => void;
    markets: Market[];
    supplies: Supplie[];
}

const FormInputPengiriman: React.FC<FormInputPengirimanProps> = ({ onPengirimanAdded }) => {
    const [markets, setMarkets] = useState<Market[]>([]);
    const [suppliess, setSupplies] = useState<Supplie[]>([]);

    const [idMarket, setIdMarket] = useState("");
    const [idSupplie, setIdSupplie] = useState("");
    const [jumlahKirim, setJumlahKirim] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [marketRes, supplieRes] = await Promise.all([
                    axios.get("http://localhost:8000/api/market"),
                    axios.get("http://localhost:8000/api/supllies"),
                ]);

                setMarkets(marketRes.data.data);
                setSupplies(supplieRes.data.data);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/api/pengiriman/store", {
                id_market: idMarket,
                id_supplie: idSupplie,
                jumlah_kirim: jumlahKirim,
                tanggal: tanggal,
            });

            if (response.status === 201) {
                const newPengiriman = response.data.data;
                onPengirimanAdded(newPengiriman);
                setIdMarket("");
                setIdSupplie("");
                setJumlahKirim("");
                setTanggal("");
                alert("Data Pengiriman Berhasil Ditambahkan");
                navigate("/form-pengiriman");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Gagal menambahkan data:", error.response?.data);
            } else {
                console.error("Unexpected Error:", error);
            }
            alert("Gagal menambahkan data!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Breadcrumb pageName="Form Input Pengiriman" />
            <div className="flex flex-col gap-9">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white text-center">
                        Form Pengiriman
                    </h3>
                    <br />
                    <Link
                        to="/form-pengiriman"
                        className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
                    >
                        Kembali
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Pilih Market
                            </label>
                            <select
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={idMarket}
                                onChange={(e) => setIdMarket(e.target.value)}
                                required
                            >
                                <option value="">-- Pilih Market --</option>
                                {markets.length > 0 ? (
                                    markets.map((market) => (
                                        <option key={market.id} value={market.id}>
                                            {market.nama}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>Data market tidak tersedia</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Pilih Supplie
                            </label>
                            <select
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={idSupplie}
                                onChange={(e) => setIdSupplie(e.target.value)}
                                required
                            >
                                <option value="">-- Pilih Supplie --</option>
                                {suppliess.length > 0 ? (
                                    suppliess.map((supplie) => (
                                        <option key={supplie.id} value={supplie.id}>
                                            {supplie.nama}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>Data supplie tidak tersedia</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Jumlah Kirim
                            </label>
                            <input
                                type="number"
                                placeholder="Masukkan jumlah kirim"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={jumlahKirim}
                                onChange={(e) => setJumlahKirim(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Tanggal Pengiriman
                            </label>
                            <input
                                type="date"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                            disabled={loading}
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormInputPengiriman;
