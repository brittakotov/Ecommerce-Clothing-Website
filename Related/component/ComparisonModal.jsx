import React from 'react';
import styles from './css_modules/RelatedGallery.module.css';

class ComparisonModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      features: {},
      tableRows: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.organizeFeaturesData = this.organizeFeaturesData.bind(this);
  }

  componentDidMount() {
    this.organizeFeaturesData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentItem[0].product_id !== prevProps.currentItem[0].product_id) {
      this.organizeFeaturesData();
    }
  }

  organizeFeaturesData() {
    let featuresData = {};
    for (let i = 0; i < this.props.currentItem[0].product.features.length; i++) {
      if (this.props.currentItem[0].product.features[i].value === null) {
        featuresData[this.props.currentItem[0].product.features[i].feature] = {
          currentItem: {contains: 'yes', value: '✓'},
          relatedItem: {contains: 'no', value: null}
        }
      } else {
        featuresData[this.props.currentItem[0].product.features[i].feature] = {
          currentItem: {contains: 'yes', value: this.props.currentItem[0].product.features[i].value},
          relatedItem: {contains: 'no', value: null}
        }
      }
    }
    for (let j = 0; j < this.props.relatedItem.product.features.length; j++) {
      if (featuresData[this.props.relatedItem.product.features[j].feature]) {
        if (this.props.relatedItem.product.features[j].value === null) {
          featuresData[this.props.relatedItem.product.features[j].feature]['relatedItem'] = {contains: 'yes', value: '✓'}
        } else {
          featuresData[this.props.relatedItem.product.features[j].feature]['relatedItem'] = {contains: 'yes', value: this.props.relatedItem.product.features[j].value}
        }
      } else {
        if (this.props.relatedItem.product.features[j].value === null) {
          featuresData[this.props.relatedItem.product.features[j].feature] = {
            currentItem: {contains: 'no', value: null},
            relatedItem: {contains: 'yes', value: '✓'}
          }
        } else {
          featuresData[this.props.relatedItem.product.features[j].feature] = {
            currentItem: {contains: 'no', value: null},
            relatedItem: {contains: 'yes', value: this.props.relatedItem.product.features[j].value}
          }
        }
      }
    }
    let featuresArray = Object.entries(featuresData);
    let rows = [];
    for (let i = 0; i < featuresArray.length; i++) {
      let currentRow = [featuresArray[i][1].currentItem.value, featuresArray[i][0], featuresArray[i][1].relatedItem.value]
      rows.push(currentRow);
    }
    this.setState({tableRows: rows});
  }

  handleClick (event) {
    if (!event.target.closest("#comparisonModal")) {
      this.props.hideModal();
      event.stopPropagation();
    }
  }

  render() {
    // console.log('this.props.currentItem: ', this.props.currentItem);
    // console.log('this.props.relatedItem: ', this.props.relatedItem);

    let showHide;
    if (!this.props.show) {
      showHide = null;
    } else {
      showHide =
        <div className={styles.comparisonModalDisplayBlock} onClick={this.handleClick}>
          <section id="comparisonModal" className={styles.comparisonModalMain}>
            <div className={styles.modalBanner}>
              <div className={styles.modalBannerContent}>
              Comparing
              </div>
            </div>
            <div className={styles.tableContainer}>
              <table id="comparisonTable">
                <tbody>
                  <tr className={styles.tableHeaders} key={'header'}>
                    <th className={styles.leftHeader}>{this.props.currentItem[0].product.name}</th>
                    <th className={styles.centerHeader}></th>
                    <th className={styles.rightHeader}>{this.props.relatedItem.product.name}</th>
                  </tr>
                  {this.state.tableRows.map((feature, index) => (
                  <tr key={'tablerow' + index}>
                    <td className={styles.leftColumn}>{feature[0]}</td>
                    <td className={styles.centerColumn}>{feature[1]}</td>
                    <td className={styles.rightColumn}>{feature[2]}</td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
    }

    return (
      <div>
        {showHide}
      </div>
    )
  }
}

export default ComparisonModal;