import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface IStockReleaseLog {
    id: number
    lastPrice: number
    margin: number
    min_quantity: number
    name: string
    quantity: number
    quantityQuotation: number
    quantityToDeliver: number
    unit: { id: number, name: string, description: string }
}

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
    date: {
        fontSize: 12,
        textAlign: 'right',
    },
    table: {
        width: 'auto',
        borderStyle: 'solid',
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableCol: {
        width: '22%',
        borderStyle: 'solid',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        margin: 3,
        fontSize: 10,
    },
    headerCell: {
        margin: 3,
        fontSize: 10,
        fontWeight: 'bold',
    },
});

const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('pt-BR');
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
}

export const StockReleaseProductsPDF = ({ products }: { products: IStockReleaseLog[] }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Cotação Manual</Text>
                <Text style={styles.date}>{getCurrentDateTime()}</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.headerCell}>Nome do Produto</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.headerCell}>Quantidade a Comprar</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.headerCell}>Unidade</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.headerCell}>Último preço</Text>
                    </View>
                </View>
                {products.map((prod) => (
                    <View style={styles.tableRow} key={prod.id}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{prod.name}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{prod.quantityQuotation}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{prod.unit.name}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>R$ {prod.lastPrice}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);