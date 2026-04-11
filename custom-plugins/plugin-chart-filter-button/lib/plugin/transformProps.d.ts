import { ChartProps, DataRecordValue, TimeseriesDataRecord } from '@superset-ui/core';
export default function transformProps(chartProps: ChartProps): {
    width: number;
    height: number;
    data: TimeseriesDataRecord[];
    headerText: any;
    setDataMask: import("@superset-ui/core").SetDataMaskHook;
    phoneColumn: any;
    labelColumn: any;
    selectedValues: DataRecordValue[] | null;
};
//# sourceMappingURL=transformProps.d.ts.map