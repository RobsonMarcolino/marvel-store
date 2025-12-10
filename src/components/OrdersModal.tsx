import { X, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrdersModal = () => {
    const { isOrdersOpen, toggleOrdersModal, orders } = useShop();

    if (!isOrdersOpen) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'text-green-500 bg-green-100 border-green-200';
            case 'shipped': return 'text-blue-500 bg-blue-100 border-blue-200';
            default: return 'text-yellow-600 bg-yellow-100 border-yellow-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered': return <CheckCircle size={16} />;
            case 'shipped': return <Truck size={16} />;
            default: return <Clock size={16} />;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'delivered': return 'Entregue';
            case 'shipped': return 'Enviado';
            default: return 'Processando';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="bg-gray-900 p-6 flex justify-between items-center border-b-4 border-red-600">
                    <div className="flex items-center gap-3">
                        <Package className="text-red-500" size={28} />
                        <h2 className="text-2xl font-bold text-white uppercase tracking-wider marvel-font">
                            Meus Pedidos
                        </h2>
                    </div>
                    <button
                        onClick={toggleOrdersModal}
                        className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto cart-scroll bg-gray-50">
                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package size={40} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum pedido encontrado</h3>
                            <p className="text-gray-500">Você ainda não realizou nenhuma missão de compra.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4 border-b border-gray-100 pb-4">
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ID do Pedido</span>
                                            <p className="font-mono font-bold text-gray-800">#{order.id}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Data</span>
                                            <p className="text-gray-700">{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</span>
                                            <p className="font-bold text-red-600">R$ {order.total.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3">
                                                <div className="w-10 h-14 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                                                    <p className="text-xs text-gray-500">Qtd: {item.qty}</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-600">R$ {(item.price * item.qty).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between bg-blue-50/50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-blue-700">
                                            <Truck size={18} />
                                            <span className="text-sm font-medium">Previsão de Entrega:</span>
                                        </div>
                                        <span className="text-sm font-bold text-blue-800">
                                            {new Date(order.estimatedDelivery).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
