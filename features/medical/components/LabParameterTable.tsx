import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import type { LabParameter } from "../types";

interface LabParameterTableProps {
  parameters: LabParameter[];
}

export function LabParameterTable({ parameters }: LabParameterTableProps) {
  return (
    <View>
      <View style={styles.headerRow}>
        <Text weight="medium" style={[styles.headerCell, styles.colParam]}>
          TEST PARAMETER
        </Text>
        <Text weight="medium" style={[styles.headerCell, styles.colResult]}>
          RESULT
        </Text>
        <Text weight="medium" style={[styles.headerCell, styles.colRange]}>
          REFERENCE RANGE
        </Text>
      </View>

      {parameters.map((param, idx) => (
        <View
          key={`${param.parameter}-${idx}`}
          style={[styles.row, idx === parameters.length - 1 && styles.lastRow]}
        >
          <Text weight="regular" style={[styles.cell, styles.colParam]}>
            {param.parameter}
          </Text>
          <View style={[styles.colResult, styles.resultCell]}>
            <Text weight="medium" style={styles.resultValue}>
              {param.result}
            </Text>
            {param.status !== "normal" && (
              <Text
                weight="medium"
                style={[
                  styles.statusPill,
                  param.status === "high" ? styles.high : styles.low,
                ]}
              >
                {param.status.toUpperCase()}
              </Text>
            )}
          </View>
          <Text weight="regular" style={[styles.cell, styles.colRange]}>
            {param.reference_range}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.homeneutral,
  },
  headerCell: {
    fontSize: 10,
    letterSpacing: 0.3,
    color: Colors.neutral600,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.homeneutral,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  cell: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.black300,
  },
  colParam: {
    flex: 1.4,
  },
  colResult: {
    flex: 1,
  },
  colRange: {
    flex: 1,
    textAlign: "right",
  },
  resultCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  resultValue: {
    fontSize: 12,
    color: Colors.black300,
  },
  statusPill: {
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: "hidden",
  },
  high: {
    color: Colors.red500,
    backgroundColor: "#FEF2F2",
  },
  low: {
    color: "#D97706",
    backgroundColor: Colors.lightYellow,
  },
});
