import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ButtonWrapper, ButtonText } from './styles';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

class Resume extends Component {

  render() {
    return (
      <PDFViewer style={{ background: 'red' }} height="400px" width="1000px">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    )
  }
};

export default Resume;