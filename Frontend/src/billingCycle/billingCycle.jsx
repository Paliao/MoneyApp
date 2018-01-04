import React, { Component } from 'react'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'

class BillingCycle extends Component {
  render() {
    return (
      <div>
        < ContentHeader title='Billing Cycles' subTitle='Register' />
        <Content>
          <Tabs>
            <TabsHeader>
              <TabHeader label='List' icon='bars' target='tabList'/>
              <TabHeader label='Include' icon='plus' target='tabCreate'/>
              <TabHeader label='Edit' icon='pencil' target='tabUpdate'/>
              <TabHeader label='Exclude' icon='trash-o' target='tabDelete'/>
            </TabsHeader>
            <TabsContent>
              <TabContent id='tabList'><h1>List</h1></TabContent>
              <TabContent id='tabCreate'><h1>Include</h1></TabContent>
              <TabContent id='tabUpdate'><h1>Update</h1></TabContent>
              <TabContent id='tabDelete'><h1>Delete</h1></TabContent>
            </TabsContent>
          </Tabs>
        </Content>
      </div>
    )
  }
}

export default BillingCycle