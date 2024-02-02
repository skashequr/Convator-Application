import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#F0F0F0'
    },
    container: {
      margin: 10,
      padding: 10,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'blue',
    }
  });


  
const CreatePdf = () => {
    return (
       <div className='p-36'>
         <Document>
        <Page size="A4" style={styles.page}> 
          <View style={styles.container}>
            <Text style={styles.text}>Simple PDF Example</Text>
          </View>
          <View style={styles.container}>
            <Text>How would you like modify.</Text>
          </View>
        </Page>
      </Document>
       </div>
    );
};

export default CreatePdf;