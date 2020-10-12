import React from "react";
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

const TableCard = (props) => {
  /* const productList = [
    {
      imgUrl: "/assets/images/products/headphone-2.jpg",
      name: "earphone",
      price: 100,
      available: 15
    },
    {
      imgUrl: "/assets/images/products/headphone-3.jpg",
      name: "earphone",
      price: 1500,
      available: 30
    },
    {
      imgUrl: "/assets/images/products/iphone-2.jpg",
      name: "iPhone x",
      price: 1900,
      available: 35
    },
    {
      imgUrl: "/assets/images/products/iphone-1.jpg",
      name: "iPhone x",
      price: 100,
      available: 0
    },
    {
      imgUrl: "/assets/images/products/headphone-3.jpg",
      name: "Head phone",
      price: 1190,
      available: 5
    }
  ]; */
  //console.log(props.orders);
  return (
    <Card elevation={3} className="pt-5 mb-6">
      <div className="card-title px-6 mb-3">Last 15 packages</div>
      <div className="overflow-auto">
        <Table className="product-table">
          <TableHead>
            <TableRow align="center">
              <TableCell className="px-10 capitalize" colSpan={4}>
                Code
              </TableCell>
              <TableCell className="px-10 capitalize" colSpan={4}>
                City
              </TableCell>
              <TableCell className="px-10 capitalize" colSpan={4}>
                Content
              </TableCell>
              <TableCell className="px-10 capitalize" colSpan={4}>
                Status
              </TableCell>
              <TableCell className="px-10 capitalize" colSpan={4}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.orders.length > 0 ? (
                props.orders.map((order, index) => (
                  <TableRow key={index} align="center">
                    <TableCell className="px-0 capitalize" colSpan={4} >
                      <div className="flex items-center" onClick={() => {
                        alert("OK")
                      }}>
                        <p className="m-0 ml-8">{order.code}</p>
                      </div>
                    </TableCell>
                    <TableCell className="px-0 capitalize" colSpan={4} >
                      <div className="flex items-center">
                        <p className="m-0 ml-8">{order.r_city}</p>
                      </div>
                    </TableCell>
                    <TableCell className="px-0 capitalize" colSpan={4} >
                      <div className="flex items-center">
                        <p className="m-0 ml-8">{order.content}</p>
                      </div>
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left" colSpan={4}>
                      {order.current_statut === "STAND BY" ? (
                        <small className="border-radius-4 bg-primary text-white px-2 py-2px ">
                          STAND BY
                        </small>
                      ) : (
                          order.current_statut === "RECEIVED" ? (
                            <small className="border-radius-4 bg-gray text-black px-2 py-2px ">
                              RECEIVED
                            </small>
                          ) : (
                              order.current_statut === "IN TRANSIT" ? (
                                <small className="border-radius-4 bg-light-primary text-white px-2 py-2px ">
                                  IN TRANSIT
                                </small>
                              ) : (
                                  order.current_statut === "ARRIVED" ? (
                                    <small className="border-radius-4 bg-secondary text-white px-2 py-2px ">
                                      ARRIVED
                                    </small>
                                  ) : (
                                      order.current_statut === "READY FOR PICKUP" ? (
                                        <small className="border-radius-4 bg-light-green text-white px-2 py-2px ">
                                          READY FOR PICKUP
                                        </small>
                                      ) : (
                                          <small className="border-radius-4 bg-green text-white px-2 py-2px ">
                                            SIGNED
                                          </small>
                                        )
                                    )
                                )

                            )
                        )}
                    </TableCell>
                    <TableCell className="px-0 capitalize" colSpan={4}>
                      {order.price ? order.price : (
                        <small className="border-radius-4 px-2 py-2px">
                          ?
                        </small>
                      )}
                    </TableCell>
                    {/* <TableCell className="px-0" colSpan={1}>
                  <IconButton>
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                </TableCell> */}
                  </TableRow>
                ))
              ) : (
                  <small className="border-radius-4 px-2 py-2px ">
                    No package yet !
                  </small>
                )

            }
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TableCard;
