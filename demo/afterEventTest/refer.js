import React, { Component } from 'react';
//业务组写法：从npm包引入
import { high } from '../../src';
const { Refer } = high;


export default function(refcode,config={}) {
   switch (refcode){
       case 'bill':
           return (
               <Refer
                   {...config}
                   refCode={'bill'}
                   queryGridUrl={'/newdemo-web/demo/matrial/matrialtree'}
                   queryTreeUrl={'/newdemo-web/demo/matrialclass/matrialclasstree'}
               />
           );
        break;
   }
}
