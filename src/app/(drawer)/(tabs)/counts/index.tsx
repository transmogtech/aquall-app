import { useEffect, useState } from "react";

import { StyleSheet, TextInput, Pressable, Platform } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Table, Row, Rows } from "react-native-table-component";
import Colors from "@/constants/Colors";
import { Text, View } from "@components/Themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { API_URL } from "@/providers/AuthProvider";
import axios from "axios";

const Counts = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedCultureType, setSelectedCultureType] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [dateRange, setdateRange] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [types, setTypes] = useState([]);
  const [cultureTypes, setCultureTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [counts, setCounts] = useState([]);

  const tableData = {
    tableHead: ["Quantity", "Prices"],
    tableData: [],
  };
  const [table, setTable] = useState(tableData);

  const getCount = async () => {
    try {
      const filter = `type=${selectedType}&area=${selectedArea}&culture_type=${selectedCultureType}&date=${date}`;
      const response = await axios.get(`${API_URL}/counts?${filter}`);
      setCounts(response.data.counts[0]);
      tableData.tableData = [];
      if (response.data.count > 0) {
        response.data.counts[0].counts.forEach((row: any) =>
          tableData.tableData.push([row.count, row.volume])
        );
      }

      setTable(tableData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // get count types
    const fetchCountTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/count-types`);

        setTypes(response.data.counttypes);
      } catch (error) {
        console.log(error);
      }
    };

    // get culture types
    const fetchCultureTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}/culture-types`);

        setCultureTypes(response.data.culturetypes);
      } catch (error) {
        console.log(error);
      }
    };
    // get locations
    const fetchCountAreas = async () => {
      try {
        const response = await axios.get(`${API_URL}/count-areas`);

        setLocations(response.data.countareas);
      } catch (error) {
        console.log(error);
      }
    };
    // get counts

    fetchCountTypes();
    fetchCultureTypes();
    fetchCountAreas();
  }, []); // eslint-disable-line

  const typeArr: any = [];
  const cultureTypeArr: any = [];
  const locationArr: any = [];

  types?.forEach((row) => typeArr.push({ key: row._id, value: row.title }));
  cultureTypes?.forEach((row) =>
    cultureTypeArr.push({ key: row._id, value: row.title })
  );
  locations?.forEach((row) =>
    locationArr.push({ key: row._id, value: row.title })
  );
  // const data = [
  //   { key: "Canada", value: "Canada" },
  //   { key: "England", value: "England" },
  //   { key: "Pakistan", value: "Pakistan" },
  //   { key: "India", value: "India" },
  //   { key: "NewZealand", value: "NewZealand" },
  // ];

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      setDate(selectedDate);

      setShowPicker(false);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setdateRange(selectedDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.item} className="pr-2">
        <Text>Type</Text>
        <SelectList
          setSelected={setSelectedType}
          data={typeArr}
          boxStyles={styles.select}
          onSelect={getCount}
        />
      </View>
      <View style={styles.item}>
        <Text>Culture Type</Text>
        <SelectList
          setSelected={setSelectedCultureType}
          data={cultureTypeArr}
          boxStyles={styles.select}
          onSelect={getCount}
        />
      </View>
      <View style={styles.item} className="pr-2">
        <Text>Todays Count prices</Text>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}
        {!showPicker && (
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              placeholder="Todays Count prices"
              className="border-slate-500 border rounded-md p-2"
              style={styles.input}
              editable={false}
              value={dateRange}
              onPressIn={toggleDatePicker}
              // readOnly="readOnly"
            />
          </Pressable>
        )}
      </View>
      <View style={styles.item}>
        <Text>Location</Text>
        <SelectList
          setSelected={setSelectedArea}
          data={locationArr}
          boxStyles={styles.select}
          onSelect={getCount}
        />
      </View>
      <View style={styles.container}>
        <Table
          borderStyle={{ borderWidth: 1, borderColor: Colors.light.blueColor }}
        >
          <Row
            data={table.tableHead}
            style={styles.head}
            textStyle={styles.headText}
          />
          <Rows data={table.tableData} textStyle={styles.text} />
        </Table>
      </View>
    </View>
  );
};
export default Counts;
const styles = StyleSheet.create({
  container: { width: "100%", paddingTop: 20 },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: 20,
  },
  item: {
    paddingVertical: 10,
    width: "50%", // is 50% of container width
  },
  head: { height: 44, backgroundColor: Colors.light.blueColor },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  select: {
    backgroundColor: Colors.light.baseGray04,
    borderColor: Colors.light.baseGray04,
  },
  input: {
    backgroundColor: Colors.light.baseGray04,
    borderColor: Colors.light.baseGray04,
  },
  text: { margin: 6, fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
